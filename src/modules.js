import { List } from 'immutable';
import Env from "./env";
import Store from "./store";
import Reader from "./shift-reader";
import * as _ from "ramda";
import TokenExpander from './token-expander.js';
import BindingMap from "./binding-map.js";
import Term, {
  isEOF, isBindingIdentifier, isFunctionDeclaration, isFunctionExpression,
  isFunctionTerm, isFunctionWithName, isSyntaxDeclaration, isSyntaxrecDeclaration, isVariableDeclaration,
  isVariableDeclarationStatement, isImport, isExport, isExportFrom, isExportAllFrom, isExportDefault,
  isExportSyntax, isSyntaxDeclarationStatement, isPragma
} from "./terms";
import { evalCompiletimeValue, evalRuntimeValues } from './load-syntax';
import Compiler from "./compiler";
import { VarBindingTransform, CompiletimeTransform } from './transforms';
import { Scope, freshScope } from "./scope";
import { assert } from './errors';

export class Module {
  constructor(moduleSpecifier, importEntries, exportEntries, pragmas, body) {
    this.moduleSpecifier = moduleSpecifier;
    this.importEntries = importEntries;
    this.exportEntries = exportEntries;
    this.pragmas = pragmas;
    this.body = body;
  }
}

const findBindingIdentifierName = term => {
  // TODO: handle destructuring
  assert(term.name, `not implemented yet for type ${term.type}`);
  return term.name;
};

const convertExport = term => {
  let declaration = term.declaration;
  let bindings = [];
  if (isVariableDeclaration(declaration)) {
    bindings = declaration.declarators.map(decl =>  findBindingIdentifierName(decl.binding));
  }

  let namedExports = bindings.map(binding => {
    return new Term('ExportSpecifier', {
      name: null,
      exportedName: binding
    });
  });
  return new Term('ExportFrom', {
    moduleSpecifier: null, namedExports
  });
};

const pragmaRegep = /^\s*#\w*/;

export class Modules {
  constructor(context) {
    this.compiledModules = new Map();
    this.context = context;
    this.context.modules = this;
  }

  load(path) {
    // TODO resolve and we need to carry the cwd through correctly
    let mod = this.context.moduleLoader(path);
    if (!pragmaRegep.test(mod)) {
      return List();
    }
    return new Reader(mod).read();
  }

  compile(stxl, path) {
    // the expander starts at phase 0, with an empty environment and store
    let scope = freshScope('top');
    let compiler = new Compiler(0, new Env(), new Store(), _.merge(this.context, {
      currentScope: [scope]
    }));
    let terms = compiler.compile(stxl.map(s => s.addScope(scope, this.context.bindings, 0)));

    let importEntries = [];
    let exportEntries = [];
    let pragmas = [];
    let filteredTerms = terms.reduce((acc, t) => {
      return _.cond([
        [isImport, t => {
          importEntries.push(t);
          return acc.concat(t);
        }],
        [isExport, t => {
          exportEntries.push(t);
          // exportEntries.push(convertExport(t));
          // return acc.concat(t.declaration);
          return acc.concat(t);
        }],
        [isPragma, t => { pragmas.push(t); return acc; } ],
        [_.T, t => acc.concat(t) ]
      ])(t);
    }, List());
    return new Module(
      path,
      List(importEntries),
      List(exportEntries),
      List(pragmas),
      filteredTerms
    );
  }

  loadAndCompile(rawPath) {
    let path = this.context.moduleResolver(rawPath, this.context.cwd);
    if (!this.compiledModules.has(path)) {
      this.compiledModules.set(path, this.compile(this.load(path), path));
    }
    return this.compiledModules.get(path);
  }

  visit(mod, phase, store) {
    mod.body.forEach(term => {
      if (isSyntaxDeclarationStatement(term) || isExportSyntax(term)) {
        term.declaration.declarators.forEach(({binding, init}) => {
          let val = evalCompiletimeValue(init.gen(), _.merge(this.context, {
            store, phase: phase + 1
          }));
          // module local binding
          store.set(binding.name.resolve(phase), new CompiletimeTransform(val));
        });
      }
    });
    return store;
  }

  invoke(mod, phase, store) {
    // throw new Error(`BC:
    //   Need to register every binding in the current phase.
    // `);
    let body = mod.body.map(term => term.gen()).filter(term => !isExportSyntax(term));
    let exportsObj = evalRuntimeValues(body, _.merge(this.context, {
      store, phase
    }));
    return store;
  }
}
