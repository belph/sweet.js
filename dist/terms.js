"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isParenthesizedExpression = exports.isFunctionWithName = exports.isFunctionTerm = exports.isSyntaxrecDeclaration = exports.isSyntaxDeclaration = exports.isEOF = exports.isVariableDeclarator = exports.isVariableDeclaration = exports.isSyntaxTemplate = exports.isTemplateElement = exports.isSwitchDefault = exports.isSwitchCase = exports.isSuper = exports.isSpreadElement = exports.isScript = exports.isFunctionDeclaration = exports.isFunctionBody = exports.isFormalParameters = exports.isDirective = exports.isCatchClause = exports.isBlock = exports.isWithStatement = exports.isWhileStatement = exports.isVariableDeclarationStatement = exports.isTryFinallyStatement = exports.isTryCatchStatement = exports.isThrowStatement = exports.isSwitchStatementWithDefault = exports.isSwitchStatement = exports.isReturnStatement = exports.isLabeledStatement = exports.isIfStatement = exports.isForStatement = exports.isForOfStatement = exports.isForInStatement = exports.isExpressionStatement = exports.isEmptyStatement = exports.isDoWhileStatement = exports.isDebuggerStatement = exports.isContinueStatement = exports.isBreakStatement = exports.isBlockStatement = exports.isYieldGeneratorExpression = exports.isYieldExpression = exports.isUpdateExpression = exports.isThisExpression = exports.isTemplateExpression = exports.isStaticMemberExpression = exports.isUnaryExpression = exports.isObjectExpression = exports.isNewTargetExpression = exports.isNewExpression = exports.isIdentifierExpression = exports.isFunctionExpression = exports.isConditionalExpression = exports.isComputedMemberExpression = exports.isComputedAssignmentExpression = exports.isCallExpression = exports.isBinaryExpression = exports.isAssignmentExpression = exports.isArrowExpression = exports.isArrayExpression = exports.isLiteralStringExpression = exports.isLiteralRegExpExpression = exports.isLiteralNumericExpression = exports.isLiteralNullExpression = exports.isLiteralInfinityExpression = exports.isLiteralBooleanExpression = exports.isStaticPropertyName = exports.isComputedPropertyName = exports.isShorthandProperty = exports.isDataProperty = exports.isSetter = exports.isGetter = exports.isMethod = exports.isExportSpecifier = exports.isExportDefault = exports.isExport = exports.isExportFrom = exports.isExportAllFrom = exports.isImportSpecifier = exports.isImportNamespace = exports.isImport = exports.isModule = exports.isClassElement = exports.isClassDeclaration = exports.isClassExpression = exports.isBindingPropertyProperty = exports.isBindingPropertyIdentifier = exports.isObjectBinding = exports.isArrayBinding = exports.isBindingIdentifier = exports.isBindingWithDefault = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _errors = require("./errors");

var _utils = require("./utils");

var _syntax = require("./syntax");

var _syntax2 = _interopRequireDefault(_syntax);

var _ramda = require("ramda");

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Term = function () {
  function Term(type_871, props_872) {
    _classCallCheck(this, Term);

    this.type = type_871;
    this.loc = null;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(props_872)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prop = _step.value;

        this[prop] = props_872[prop];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(Term, [{
    key: "addScope",
    value: function addScope(scope_873, bindings_874, options_875) {
      var next_876 = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = fieldsIn_870(this)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var field = _step2.value;

          if (this[field] == null) {
            next_876[field] = null;
          } else if (typeof this[field].addScope === "function") {
            next_876[field] = this[field].addScope(scope_873, bindings_874, options_875);
          } else if (_immutable.List.isList(this[field])) {
            next_876[field] = this[field].map(function (f_877) {
              return f_877.addScope(scope_873, bindings_874, options_875);
            });
          } else {
            next_876[field] = this[field];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return new Term(this.type, next_876);
    }
  }]);

  return Term;
}();

exports.default = Term;
var isBindingWithDefault = exports.isBindingWithDefault = R.whereEq({ type: "BindingWithDefault" });
;
var isBindingIdentifier = exports.isBindingIdentifier = R.whereEq({ type: "BindingIdentifier" });
;
var isArrayBinding = exports.isArrayBinding = R.whereEq({ type: "ArrayBinding" });
;
var isObjectBinding = exports.isObjectBinding = R.whereEq({ type: "ObjectBinding" });
;
var isBindingPropertyIdentifier = exports.isBindingPropertyIdentifier = R.whereEq({ type: "BindingPropertyIdentifier" });
;
var isBindingPropertyProperty = exports.isBindingPropertyProperty = R.whereEq({ type: "BindingPropertyIdentifier" });
;
var isClassExpression = exports.isClassExpression = R.whereEq({ type: "ClassExpression" });
;
var isClassDeclaration = exports.isClassDeclaration = R.whereEq({ type: "ClassDeclaration" });
;
var isClassElement = exports.isClassElement = R.whereEq({ type: "ClassElement" });
;
var isModule = exports.isModule = R.whereEq({ type: "Module" });
;
var isImport = exports.isImport = R.whereEq({ type: "Import" });
;
var isImportNamespace = exports.isImportNamespace = R.whereEq({ type: "ImportNamespace" });
;
var isImportSpecifier = exports.isImportSpecifier = R.whereEq({ type: "ImportSpecifier" });
;
var isExportAllFrom = exports.isExportAllFrom = R.whereEq({ type: "ExportAllFrom" });
;
var isExportFrom = exports.isExportFrom = R.whereEq({ type: "ExportFrom" });
;
var isExport = exports.isExport = R.whereEq({ type: "Export" });
;
var isExportDefault = exports.isExportDefault = R.whereEq({ type: "ExportDefault" });
;
var isExportSpecifier = exports.isExportSpecifier = R.whereEq({ type: "ExportSpecifier" });
;
var isMethod = exports.isMethod = R.whereEq({ type: "Method" });
;
var isGetter = exports.isGetter = R.whereEq({ type: "Getter" });
;
var isSetter = exports.isSetter = R.whereEq({ type: "Setter" });
;
var isDataProperty = exports.isDataProperty = R.whereEq({ type: "DataProperty" });
;
var isShorthandProperty = exports.isShorthandProperty = R.whereEq({ type: "ShorthandProperty" });
;
var isComputedPropertyName = exports.isComputedPropertyName = R.whereEq({ type: "ComputedPropertyName" });
;
var isStaticPropertyName = exports.isStaticPropertyName = R.whereEq({ type: "StaticPropertyName" });
;
var isLiteralBooleanExpression = exports.isLiteralBooleanExpression = R.whereEq({ type: "LiteralBooleanExpression" });
;
var isLiteralInfinityExpression = exports.isLiteralInfinityExpression = R.whereEq({ type: "LiteralInfinityExpression" });
;
var isLiteralNullExpression = exports.isLiteralNullExpression = R.whereEq({ type: "LiteralNullExpression" });
;
var isLiteralNumericExpression = exports.isLiteralNumericExpression = R.whereEq({ type: "LiteralNumericExpression" });
;
var isLiteralRegExpExpression = exports.isLiteralRegExpExpression = R.whereEq({ type: "LiteralRegExpExpression" });
;
var isLiteralStringExpression = exports.isLiteralStringExpression = R.whereEq({ type: "LiteralStringExpression" });
;
var isArrayExpression = exports.isArrayExpression = R.whereEq({ type: "ArrayExpression" });
;
var isArrowExpression = exports.isArrowExpression = R.whereEq({ type: "ArrowExpression" });
;
var isAssignmentExpression = exports.isAssignmentExpression = R.whereEq({ type: "AssignmentExpression" });
;
var isBinaryExpression = exports.isBinaryExpression = R.whereEq({ type: "BinaryExpression" });
;
var isCallExpression = exports.isCallExpression = R.whereEq({ type: "CallExpression" });
;
var isComputedAssignmentExpression = exports.isComputedAssignmentExpression = R.whereEq({ type: "ComputedAssignmentExpression" });
;
var isComputedMemberExpression = exports.isComputedMemberExpression = R.whereEq({ type: "ComputedMemberExpression" });
;
var isConditionalExpression = exports.isConditionalExpression = R.whereEq({ type: "ConditionalExpression" });
;
var isFunctionExpression = exports.isFunctionExpression = R.whereEq({ type: "FunctionExpression" });
;
var isIdentifierExpression = exports.isIdentifierExpression = R.whereEq({ type: "IdentifierExpression" });
;
var isNewExpression = exports.isNewExpression = R.whereEq({ type: "NewExpression" });
;
var isNewTargetExpression = exports.isNewTargetExpression = R.whereEq({ type: "NewTargetExpression" });
;
var isObjectExpression = exports.isObjectExpression = R.whereEq({ type: "ObjectExpression" });
;
var isUnaryExpression = exports.isUnaryExpression = R.whereEq({ type: "UnaryExpression" });
;
var isStaticMemberExpression = exports.isStaticMemberExpression = R.whereEq({ type: "StaticMemberExpression" });
;
var isTemplateExpression = exports.isTemplateExpression = R.whereEq({ type: "TemplateExpression" });
;
var isThisExpression = exports.isThisExpression = R.whereEq({ type: "ThisExpression" });
;
var isUpdateExpression = exports.isUpdateExpression = R.whereEq({ type: "UpdateExpression" });
;
var isYieldExpression = exports.isYieldExpression = R.whereEq({ type: "YieldExpression" });
;
var isYieldGeneratorExpression = exports.isYieldGeneratorExpression = R.whereEq({ type: "YieldGeneratorExpression" });
;
var isBlockStatement = exports.isBlockStatement = R.whereEq({ type: "BlockStatement" });
;
var isBreakStatement = exports.isBreakStatement = R.whereEq({ type: "BreakStatement" });
;
var isContinueStatement = exports.isContinueStatement = R.whereEq({ type: "ContinueStatement" });
;
var isDebuggerStatement = exports.isDebuggerStatement = R.whereEq({ type: "DebuggerStatement" });
;
var isDoWhileStatement = exports.isDoWhileStatement = R.whereEq({ type: "DoWhileStatement" });
;
var isEmptyStatement = exports.isEmptyStatement = R.whereEq({ type: "EmptyStatement" });
;
var isExpressionStatement = exports.isExpressionStatement = R.whereEq({ type: "ExpressionStatement" });
;
var isForInStatement = exports.isForInStatement = R.whereEq({ type: "ForInStatement" });
;
var isForOfStatement = exports.isForOfStatement = R.whereEq({ type: "ForOfStatement" });
;
var isForStatement = exports.isForStatement = R.whereEq({ type: "ForStatement" });
;
var isIfStatement = exports.isIfStatement = R.whereEq({ type: "IfStatement" });
;
var isLabeledStatement = exports.isLabeledStatement = R.whereEq({ type: "LabeledStatement" });
;
var isReturnStatement = exports.isReturnStatement = R.whereEq({ type: "ReturnStatement" });
;
var isSwitchStatement = exports.isSwitchStatement = R.whereEq({ type: "SwitchStatement" });
;
var isSwitchStatementWithDefault = exports.isSwitchStatementWithDefault = R.whereEq({ type: "SwitchStatementWithDefault" });
;
var isThrowStatement = exports.isThrowStatement = R.whereEq({ type: "ThrowStatement" });
;
var isTryCatchStatement = exports.isTryCatchStatement = R.whereEq({ type: "TryCatchStatement" });
;
var isTryFinallyStatement = exports.isTryFinallyStatement = R.whereEq({ type: "TryFinallyStatement" });
;
var isVariableDeclarationStatement = exports.isVariableDeclarationStatement = R.whereEq({ type: "VariableDeclarationStatement" });
;
var isWhileStatement = exports.isWhileStatement = R.whereEq({ type: "WhileStatement" });
;
var isWithStatement = exports.isWithStatement = R.whereEq({ type: "WithStatement" });
;
var isBlock = exports.isBlock = R.whereEq({ type: "Block" });
;
var isCatchClause = exports.isCatchClause = R.whereEq({ type: "CatchClause" });
;
var isDirective = exports.isDirective = R.whereEq({ type: "Directive" });
;
var isFormalParameters = exports.isFormalParameters = R.whereEq({ type: "FormalParameters" });
;
var isFunctionBody = exports.isFunctionBody = R.whereEq({ type: "FunctionBody" });
;
var isFunctionDeclaration = exports.isFunctionDeclaration = R.whereEq({ type: "FunctionDeclaration" });
;
var isScript = exports.isScript = R.whereEq({ type: "Script" });
;
var isSpreadElement = exports.isSpreadElement = R.whereEq({ type: "SpreadElement" });
;
var isSuper = exports.isSuper = R.whereEq({ type: "Super" });
;
var isSwitchCase = exports.isSwitchCase = R.whereEq({ type: "SwitchCase" });
;
var isSwitchDefault = exports.isSwitchDefault = R.whereEq({ type: "SwitchDefault" });
;
var isTemplateElement = exports.isTemplateElement = R.whereEq({ type: "TemplateElement" });
;
var isSyntaxTemplate = exports.isSyntaxTemplate = R.whereEq({ type: "SyntaxTemplate" });
;
var isVariableDeclaration = exports.isVariableDeclaration = R.whereEq({ type: "VariableDeclaration" });
;
var isVariableDeclarator = exports.isVariableDeclarator = R.whereEq({ type: "VariableDeclarator" });
;
var isEOF = exports.isEOF = R.whereEq({ type: "EOF" });
;
var isSyntaxDeclaration = exports.isSyntaxDeclaration = R.both(isVariableDeclaration, R.whereEq({ kind: "syntax" }));
;
var isSyntaxrecDeclaration = exports.isSyntaxrecDeclaration = R.both(isVariableDeclaration, R.whereEq({ kind: "syntaxrec" }));
;
var isFunctionTerm = exports.isFunctionTerm = R.either(isFunctionDeclaration, isFunctionExpression);
;
var isFunctionWithName = exports.isFunctionWithName = R.and(isFunctionTerm, R.complement(R.where({ name: R.isNil })));
;
var isParenthesizedExpression = exports.isParenthesizedExpression = R.whereEq({ type: "ParenthesizedExpression" });
;
var fieldsIn_870 = R.cond([[isBindingWithDefault, R.always(_immutable.List.of("binding", "init"))], [isBindingIdentifier, R.always(_immutable.List.of("name"))], [isArrayBinding, R.always(_immutable.List.of("elements", "restElement"))], [isObjectBinding, R.always(_immutable.List.of("properties"))], [isBindingPropertyIdentifier, R.always(_immutable.List.of("binding", "init"))], [isBindingPropertyProperty, R.always(_immutable.List.of("name", "binding"))], [isClassExpression, R.always(_immutable.List.of("name", "super", "elements"))], [isClassDeclaration, R.always(_immutable.List.of("name", "super", "elements"))], [isClassElement, R.always(_immutable.List.of("isStatic", "method"))], [isModule, R.always(_immutable.List.of("directives", "items"))], [isImport, R.always(_immutable.List.of("moduleSpecifier", "defaultBinding", "namedImports"))], [isImportNamespace, R.always(_immutable.List.of("moduleSpecifier", "defaultBinding", "namespaceBinding"))], [isImportSpecifier, R.always(_immutable.List.of("name", "binding"))], [isExportAllFrom, R.always(_immutable.List.of("moduleSpecifier"))], [isExportFrom, R.always(_immutable.List.of("namedExports", "moduleSpecifier"))], [isExport, R.always(_immutable.List.of("declaration"))], [isExportDefault, R.always(_immutable.List.of("body"))], [isExportSpecifier, R.always(_immutable.List.of("name", "exportedName"))], [isMethod, R.always(_immutable.List.of("body", "isGenerator", "params"))], [isGetter, R.always(_immutable.List.of("body"))], [isSetter, R.always(_immutable.List.of("body", "param"))], [isDataProperty, R.always(_immutable.List.of("name", "expression"))], [isShorthandProperty, R.always(_immutable.List.of("expression"))], [isStaticPropertyName, R.always(_immutable.List.of("value"))], [isLiteralBooleanExpression, R.always(_immutable.List.of("value"))], [isLiteralInfinityExpression, R.always((0, _immutable.List)())], [isLiteralNullExpression, R.always((0, _immutable.List)())], [isLiteralNumericExpression, R.always(_immutable.List.of("value"))], [isLiteralRegExpExpression, R.always(_immutable.List.of("pattern", "flags"))], [isLiteralStringExpression, R.always(_immutable.List.of("value"))], [isArrayExpression, R.always(_immutable.List.of("elements"))], [isArrowExpression, R.always(_immutable.List.of("params", "body"))], [isAssignmentExpression, R.always(_immutable.List.of("binding", "expression"))], [isBinaryExpression, R.always(_immutable.List.of("operator", "left", "right"))], [isCallExpression, R.always(_immutable.List.of("callee", "arguments"))], [isComputedAssignmentExpression, R.always(_immutable.List.of("operator", "binding", "expression"))], [isComputedMemberExpression, R.always(_immutable.List.of("object", "expression"))], [isConditionalExpression, R.always(_immutable.List.of("test", "consequent", "alternate"))], [isFunctionExpression, R.always(_immutable.List.of("name", "isGenerator", "params", "body"))], [isIdentifierExpression, R.always(_immutable.List.of("name"))], [isNewExpression, R.always(_immutable.List.of("callee", "arguments"))], [isNewTargetExpression, R.always((0, _immutable.List)())], [isObjectExpression, R.always(_immutable.List.of("properties"))], [isUnaryExpression, R.always(_immutable.List.of("operator", "operand"))], [isStaticMemberExpression, R.always(_immutable.List.of("object", "property"))], [isTemplateExpression, R.always(_immutable.List.of("tag", "elements"))], [isThisExpression, R.always((0, _immutable.List)())], [isYieldExpression, R.always(_immutable.List.of("expression"))], [isYieldGeneratorExpression, R.always(_immutable.List.of("expression"))], [isBlockStatement, R.always(_immutable.List.of("block"))], [isBreakStatement, R.always(_immutable.List.of("label"))], [isContinueStatement, R.always(_immutable.List.of("label"))], [isDebuggerStatement, R.always((0, _immutable.List)())], [isDoWhileStatement, R.always(_immutable.List.of("test", "body"))], [isEmptyStatement, R.always((0, _immutable.List)())], [isExpressionStatement, R.always(_immutable.List.of("expression"))], [isForInStatement, R.always(_immutable.List.of("left", "right", "body"))], [isForOfStatement, R.always(_immutable.List.of("left", "right", "body"))], [isForStatement, R.always(_immutable.List.of("init", "test", "update", "body"))], [isLabeledStatement, R.always(_immutable.List.of("label", "body"))], [isReturnStatement, R.always(_immutable.List.of("expression"))], [isSwitchStatementWithDefault, R.always(_immutable.List.of("discriminant", "preDefaultCases", "defaultCase", "postDefaultCases"))], [isThrowStatement, R.always(_immutable.List.of("expression"))], [isTryCatchStatement, R.always(_immutable.List.of("body", "catchClause"))], [isTryFinallyStatement, R.always(_immutable.List.of("body", "catchClause", "finalizer"))], [isVariableDeclarationStatement, R.always(_immutable.List.of("declaration"))], [isWithStatement, R.always(_immutable.List.of("object", "body"))], [isBlock, R.always(_immutable.List.of("statements"))], [isCatchClause, R.always(_immutable.List.of("binding", "body"))], [isDirective, R.always(_immutable.List.of("rawValue"))], [isFormalParameters, R.always(_immutable.List.of("items", "rest"))], [isFunctionBody, R.always(_immutable.List.of("directives", "statements"))], [isFunctionDeclaration, R.always(_immutable.List.of("name", "isGenerator", "params", "body"))], [isScript, R.always(_immutable.List.of("directives", "statements"))], [isSpreadElement, R.always(_immutable.List.of("expression"))], [isSuper, R.always((0, _immutable.List)())], [isSwitchCase, R.always(_immutable.List.of("test", "consequent"))], [isSwitchDefault, R.always(_immutable.List.of("consequent"))], [isTemplateElement, R.always(_immutable.List.of("rawValue"))], [isSyntaxTemplate, R.always(_immutable.List.of("template"))], [isVariableDeclaration, R.always(_immutable.List.of("kind", "declarators"))], [isVariableDeclarator, R.always(_immutable.List.of("binding", "init"))], [isParenthesizedExpression, R.always(_immutable.List.of("inner"))], [R.T, function (type_878) {
  return (0, _errors.assert)(false, "Missing case in fields: " + type_878.type);
}]]);
//# sourceMappingURL=data:application/json;base64,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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdH0gZnJvbSBcImltbXV0YWJsZVwiO1xuaW1wb3J0IHthc3NlcnQsIGV4cGVjdH0gZnJvbSBcIi4vZXJyb3JzXCI7XG5pbXBvcnQge21peGlufSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IFN5bnRheCBmcm9tIFwiLi9zeW50YXhcIjtcbmltcG9ydCAgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVybSB7XG4gIGNvbnN0cnVjdG9yKHR5cGVfODcxLCBwcm9wc184NzIpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlXzg3MTtcbiAgICB0aGlzLmxvYyA9IG51bGw7XG4gICAgZm9yIChsZXQgcHJvcCBvZiBPYmplY3Qua2V5cyhwcm9wc184NzIpKSB7XG4gICAgICB0aGlzW3Byb3BdID0gcHJvcHNfODcyW3Byb3BdO1xuICAgIH1cbiAgfVxuICBhZGRTY29wZShzY29wZV84NzMsIGJpbmRpbmdzXzg3NCwgb3B0aW9uc184NzUpIHtcbiAgICBsZXQgbmV4dF84NzYgPSB7fTtcbiAgICBmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHNJbl84NzAodGhpcykpIHtcbiAgICAgIGlmICh0aGlzW2ZpZWxkXSA9PSBudWxsKSB7XG4gICAgICAgIG5leHRfODc2W2ZpZWxkXSA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzW2ZpZWxkXS5hZGRTY29wZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG5leHRfODc2W2ZpZWxkXSA9IHRoaXNbZmllbGRdLmFkZFNjb3BlKHNjb3BlXzg3MywgYmluZGluZ3NfODc0LCBvcHRpb25zXzg3NSk7XG4gICAgICB9IGVsc2UgaWYgKExpc3QuaXNMaXN0KHRoaXNbZmllbGRdKSkge1xuICAgICAgICBuZXh0Xzg3NltmaWVsZF0gPSB0aGlzW2ZpZWxkXS5tYXAoZl84NzcgPT4gZl84NzcuYWRkU2NvcGUoc2NvcGVfODczLCBiaW5kaW5nc184NzQsIG9wdGlvbnNfODc1KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0Xzg3NltmaWVsZF0gPSB0aGlzW2ZpZWxkXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBUZXJtKHRoaXMudHlwZSwgbmV4dF84NzYpO1xuICB9XG59XG5leHBvcnQgY29uc3QgaXNCaW5kaW5nV2l0aERlZmF1bHQgPSBSLndoZXJlRXEoe3R5cGU6IFwiQmluZGluZ1dpdGhEZWZhdWx0XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0JpbmRpbmdJZGVudGlmaWVyID0gUi53aGVyZUVxKHt0eXBlOiBcIkJpbmRpbmdJZGVudGlmaWVyXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0FycmF5QmluZGluZyA9IFIud2hlcmVFcSh7dHlwZTogXCJBcnJheUJpbmRpbmdcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzT2JqZWN0QmluZGluZyA9IFIud2hlcmVFcSh7dHlwZTogXCJPYmplY3RCaW5kaW5nXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0JpbmRpbmdQcm9wZXJ0eUlkZW50aWZpZXIgPSBSLndoZXJlRXEoe3R5cGU6IFwiQmluZGluZ1Byb3BlcnR5SWRlbnRpZmllclwifSk7XG47XG5leHBvcnQgY29uc3QgaXNCaW5kaW5nUHJvcGVydHlQcm9wZXJ0eSA9IFIud2hlcmVFcSh7dHlwZTogXCJCaW5kaW5nUHJvcGVydHlJZGVudGlmaWVyXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0NsYXNzRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJDbGFzc0V4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQ2xhc3NEZWNsYXJhdGlvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJDbGFzc0RlY2xhcmF0aW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0NsYXNzRWxlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJDbGFzc0VsZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzTW9kdWxlID0gUi53aGVyZUVxKHt0eXBlOiBcIk1vZHVsZVwifSk7XG47XG5leHBvcnQgY29uc3QgaXNJbXBvcnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiSW1wb3J0XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0ltcG9ydE5hbWVzcGFjZSA9IFIud2hlcmVFcSh7dHlwZTogXCJJbXBvcnROYW1lc3BhY2VcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzSW1wb3J0U3BlY2lmaWVyID0gUi53aGVyZUVxKHt0eXBlOiBcIkltcG9ydFNwZWNpZmllclwifSk7XG47XG5leHBvcnQgY29uc3QgaXNFeHBvcnRBbGxGcm9tID0gUi53aGVyZUVxKHt0eXBlOiBcIkV4cG9ydEFsbEZyb21cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRXhwb3J0RnJvbSA9IFIud2hlcmVFcSh7dHlwZTogXCJFeHBvcnRGcm9tXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0V4cG9ydCA9IFIud2hlcmVFcSh7dHlwZTogXCJFeHBvcnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRXhwb3J0RGVmYXVsdCA9IFIud2hlcmVFcSh7dHlwZTogXCJFeHBvcnREZWZhdWx0XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0V4cG9ydFNwZWNpZmllciA9IFIud2hlcmVFcSh7dHlwZTogXCJFeHBvcnRTcGVjaWZpZXJcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzTWV0aG9kID0gUi53aGVyZUVxKHt0eXBlOiBcIk1ldGhvZFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNHZXR0ZXIgPSBSLndoZXJlRXEoe3R5cGU6IFwiR2V0dGVyXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1NldHRlciA9IFIud2hlcmVFcSh7dHlwZTogXCJTZXR0ZXJcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRGF0YVByb3BlcnR5ID0gUi53aGVyZUVxKHt0eXBlOiBcIkRhdGFQcm9wZXJ0eVwifSk7XG47XG5leHBvcnQgY29uc3QgaXNTaG9ydGhhbmRQcm9wZXJ0eSA9IFIud2hlcmVFcSh7dHlwZTogXCJTaG9ydGhhbmRQcm9wZXJ0eVwifSk7XG47XG5leHBvcnQgY29uc3QgaXNDb21wdXRlZFByb3BlcnR5TmFtZSA9IFIud2hlcmVFcSh7dHlwZTogXCJDb21wdXRlZFByb3BlcnR5TmFtZVwifSk7XG47XG5leHBvcnQgY29uc3QgaXNTdGF0aWNQcm9wZXJ0eU5hbWUgPSBSLndoZXJlRXEoe3R5cGU6IFwiU3RhdGljUHJvcGVydHlOYW1lXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0xpdGVyYWxCb29sZWFuRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJMaXRlcmFsQm9vbGVhbkV4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzTGl0ZXJhbEluZmluaXR5RXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJMaXRlcmFsSW5maW5pdHlFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0xpdGVyYWxOdWxsRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJMaXRlcmFsTnVsbEV4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzTGl0ZXJhbE51bWVyaWNFeHByZXNzaW9uID0gUi53aGVyZUVxKHt0eXBlOiBcIkxpdGVyYWxOdW1lcmljRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNMaXRlcmFsUmVnRXhwRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJMaXRlcmFsUmVnRXhwRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNMaXRlcmFsU3RyaW5nRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJMaXRlcmFsU3RyaW5nRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNBcnJheUV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiQXJyYXlFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0Fycm93RXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJBcnJvd0V4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQXNzaWdubWVudEV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiQXNzaWdubWVudEV4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQmluYXJ5RXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJCaW5hcnlFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0NhbGxFeHByZXNzaW9uID0gUi53aGVyZUVxKHt0eXBlOiBcIkNhbGxFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0NvbXB1dGVkQXNzaWdubWVudEV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiQ29tcHV0ZWRBc3NpZ25tZW50RXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNDb21wdXRlZE1lbWJlckV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiQ29tcHV0ZWRNZW1iZXJFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0NvbmRpdGlvbmFsRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJDb25kaXRpb25hbEV4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb25FeHByZXNzaW9uID0gUi53aGVyZUVxKHt0eXBlOiBcIkZ1bmN0aW9uRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNJZGVudGlmaWVyRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJJZGVudGlmaWVyRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNOZXdFeHByZXNzaW9uID0gUi53aGVyZUVxKHt0eXBlOiBcIk5ld0V4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzTmV3VGFyZ2V0RXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJOZXdUYXJnZXRFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc09iamVjdEV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiT2JqZWN0RXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNVbmFyeUV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiVW5hcnlFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1N0YXRpY01lbWJlckV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiU3RhdGljTWVtYmVyRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNUZW1wbGF0ZUV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiVGVtcGxhdGVFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1RoaXNFeHByZXNzaW9uID0gUi53aGVyZUVxKHt0eXBlOiBcIlRoaXNFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1VwZGF0ZUV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiVXBkYXRlRXhwcmVzc2lvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNZaWVsZEV4cHJlc3Npb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiWWllbGRFeHByZXNzaW9uXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1lpZWxkR2VuZXJhdG9yRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJZaWVsZEdlbmVyYXRvckV4cHJlc3Npb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQmxvY2tTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiQmxvY2tTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQnJlYWtTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiQnJlYWtTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQ29udGludWVTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiQ29udGludWVTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRGVidWdnZXJTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiRGVidWdnZXJTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRG9XaGlsZVN0YXRlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJEb1doaWxlU3RhdGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0VtcHR5U3RhdGVtZW50ID0gUi53aGVyZUVxKHt0eXBlOiBcIkVtcHR5U3RhdGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0V4cHJlc3Npb25TdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNGb3JJblN0YXRlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJGb3JJblN0YXRlbWVudFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNGb3JPZlN0YXRlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJGb3JPZlN0YXRlbWVudFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNGb3JTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiRm9yU3RhdGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0lmU3RhdGVtZW50ID0gUi53aGVyZUVxKHt0eXBlOiBcIklmU3RhdGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0xhYmVsZWRTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiTGFiZWxlZFN0YXRlbWVudFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNSZXR1cm5TdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiUmV0dXJuU3RhdGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1N3aXRjaFN0YXRlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJTd2l0Y2hTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzU3dpdGNoU3RhdGVtZW50V2l0aERlZmF1bHQgPSBSLndoZXJlRXEoe3R5cGU6IFwiU3dpdGNoU3RhdGVtZW50V2l0aERlZmF1bHRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzVGhyb3dTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiVGhyb3dTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzVHJ5Q2F0Y2hTdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiVHJ5Q2F0Y2hTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzVHJ5RmluYWxseVN0YXRlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJUcnlGaW5hbGx5U3RhdGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1ZhcmlhYmxlRGVjbGFyYXRpb25TdGF0ZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiVmFyaWFibGVEZWNsYXJhdGlvblN0YXRlbWVudFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNXaGlsZVN0YXRlbWVudCA9IFIud2hlcmVFcSh7dHlwZTogXCJXaGlsZVN0YXRlbWVudFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNXaXRoU3RhdGVtZW50ID0gUi53aGVyZUVxKHt0eXBlOiBcIldpdGhTdGF0ZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQmxvY2sgPSBSLndoZXJlRXEoe3R5cGU6IFwiQmxvY2tcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzQ2F0Y2hDbGF1c2UgPSBSLndoZXJlRXEoe3R5cGU6IFwiQ2F0Y2hDbGF1c2VcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRGlyZWN0aXZlID0gUi53aGVyZUVxKHt0eXBlOiBcIkRpcmVjdGl2ZVwifSk7XG47XG5leHBvcnQgY29uc3QgaXNGb3JtYWxQYXJhbWV0ZXJzID0gUi53aGVyZUVxKHt0eXBlOiBcIkZvcm1hbFBhcmFtZXRlcnNcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb25Cb2R5ID0gUi53aGVyZUVxKHt0eXBlOiBcIkZ1bmN0aW9uQm9keVwifSk7XG47XG5leHBvcnQgY29uc3QgaXNGdW5jdGlvbkRlY2xhcmF0aW9uID0gUi53aGVyZUVxKHt0eXBlOiBcIkZ1bmN0aW9uRGVjbGFyYXRpb25cIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzU2NyaXB0ID0gUi53aGVyZUVxKHt0eXBlOiBcIlNjcmlwdFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNTcHJlYWRFbGVtZW50ID0gUi53aGVyZUVxKHt0eXBlOiBcIlNwcmVhZEVsZW1lbnRcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzU3VwZXIgPSBSLndoZXJlRXEoe3R5cGU6IFwiU3VwZXJcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzU3dpdGNoQ2FzZSA9IFIud2hlcmVFcSh7dHlwZTogXCJTd2l0Y2hDYXNlXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1N3aXRjaERlZmF1bHQgPSBSLndoZXJlRXEoe3R5cGU6IFwiU3dpdGNoRGVmYXVsdFwifSk7XG47XG5leHBvcnQgY29uc3QgaXNUZW1wbGF0ZUVsZW1lbnQgPSBSLndoZXJlRXEoe3R5cGU6IFwiVGVtcGxhdGVFbGVtZW50XCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1N5bnRheFRlbXBsYXRlID0gUi53aGVyZUVxKHt0eXBlOiBcIlN5bnRheFRlbXBsYXRlXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc1ZhcmlhYmxlRGVjbGFyYXRpb24gPSBSLndoZXJlRXEoe3R5cGU6IFwiVmFyaWFibGVEZWNsYXJhdGlvblwifSk7XG47XG5leHBvcnQgY29uc3QgaXNWYXJpYWJsZURlY2xhcmF0b3IgPSBSLndoZXJlRXEoe3R5cGU6IFwiVmFyaWFibGVEZWNsYXJhdG9yXCJ9KTtcbjtcbmV4cG9ydCBjb25zdCBpc0VPRiA9IFIud2hlcmVFcSh7dHlwZTogXCJFT0ZcIn0pO1xuO1xuZXhwb3J0IGNvbnN0IGlzU3ludGF4RGVjbGFyYXRpb24gPSBSLmJvdGgoaXNWYXJpYWJsZURlY2xhcmF0aW9uLCBSLndoZXJlRXEoe2tpbmQ6IFwic3ludGF4XCJ9KSk7XG47XG5leHBvcnQgY29uc3QgaXNTeW50YXhyZWNEZWNsYXJhdGlvbiA9IFIuYm90aChpc1ZhcmlhYmxlRGVjbGFyYXRpb24sIFIud2hlcmVFcSh7a2luZDogXCJzeW50YXhyZWNcIn0pKTtcbjtcbmV4cG9ydCBjb25zdCBpc0Z1bmN0aW9uVGVybSA9IFIuZWl0aGVyKGlzRnVuY3Rpb25EZWNsYXJhdGlvbiwgaXNGdW5jdGlvbkV4cHJlc3Npb24pO1xuO1xuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb25XaXRoTmFtZSA9IFIuYW5kKGlzRnVuY3Rpb25UZXJtLCBSLmNvbXBsZW1lbnQoUi53aGVyZSh7bmFtZTogUi5pc05pbH0pKSk7XG47XG5leHBvcnQgY29uc3QgaXNQYXJlbnRoZXNpemVkRXhwcmVzc2lvbiA9IFIud2hlcmVFcSh7dHlwZTogXCJQYXJlbnRoZXNpemVkRXhwcmVzc2lvblwifSk7XG47XG5jb25zdCBmaWVsZHNJbl84NzAgPSBSLmNvbmQoW1tpc0JpbmRpbmdXaXRoRGVmYXVsdCwgUi5hbHdheXMoTGlzdC5vZihcImJpbmRpbmdcIiwgXCJpbml0XCIpKV0sIFtpc0JpbmRpbmdJZGVudGlmaWVyLCBSLmFsd2F5cyhMaXN0Lm9mKFwibmFtZVwiKSldLCBbaXNBcnJheUJpbmRpbmcsIFIuYWx3YXlzKExpc3Qub2YoXCJlbGVtZW50c1wiLCBcInJlc3RFbGVtZW50XCIpKV0sIFtpc09iamVjdEJpbmRpbmcsIFIuYWx3YXlzKExpc3Qub2YoXCJwcm9wZXJ0aWVzXCIpKV0sIFtpc0JpbmRpbmdQcm9wZXJ0eUlkZW50aWZpZXIsIFIuYWx3YXlzKExpc3Qub2YoXCJiaW5kaW5nXCIsIFwiaW5pdFwiKSldLCBbaXNCaW5kaW5nUHJvcGVydHlQcm9wZXJ0eSwgUi5hbHdheXMoTGlzdC5vZihcIm5hbWVcIiwgXCJiaW5kaW5nXCIpKV0sIFtpc0NsYXNzRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcIm5hbWVcIiwgXCJzdXBlclwiLCBcImVsZW1lbnRzXCIpKV0sIFtpc0NsYXNzRGVjbGFyYXRpb24sIFIuYWx3YXlzKExpc3Qub2YoXCJuYW1lXCIsIFwic3VwZXJcIiwgXCJlbGVtZW50c1wiKSldLCBbaXNDbGFzc0VsZW1lbnQsIFIuYWx3YXlzKExpc3Qub2YoXCJpc1N0YXRpY1wiLCBcIm1ldGhvZFwiKSldLCBbaXNNb2R1bGUsIFIuYWx3YXlzKExpc3Qub2YoXCJkaXJlY3RpdmVzXCIsIFwiaXRlbXNcIikpXSwgW2lzSW1wb3J0LCBSLmFsd2F5cyhMaXN0Lm9mKFwibW9kdWxlU3BlY2lmaWVyXCIsIFwiZGVmYXVsdEJpbmRpbmdcIiwgXCJuYW1lZEltcG9ydHNcIikpXSwgW2lzSW1wb3J0TmFtZXNwYWNlLCBSLmFsd2F5cyhMaXN0Lm9mKFwibW9kdWxlU3BlY2lmaWVyXCIsIFwiZGVmYXVsdEJpbmRpbmdcIiwgXCJuYW1lc3BhY2VCaW5kaW5nXCIpKV0sIFtpc0ltcG9ydFNwZWNpZmllciwgUi5hbHdheXMoTGlzdC5vZihcIm5hbWVcIiwgXCJiaW5kaW5nXCIpKV0sIFtpc0V4cG9ydEFsbEZyb20sIFIuYWx3YXlzKExpc3Qub2YoXCJtb2R1bGVTcGVjaWZpZXJcIikpXSwgW2lzRXhwb3J0RnJvbSwgUi5hbHdheXMoTGlzdC5vZihcIm5hbWVkRXhwb3J0c1wiLCBcIm1vZHVsZVNwZWNpZmllclwiKSldLCBbaXNFeHBvcnQsIFIuYWx3YXlzKExpc3Qub2YoXCJkZWNsYXJhdGlvblwiKSldLCBbaXNFeHBvcnREZWZhdWx0LCBSLmFsd2F5cyhMaXN0Lm9mKFwiYm9keVwiKSldLCBbaXNFeHBvcnRTcGVjaWZpZXIsIFIuYWx3YXlzKExpc3Qub2YoXCJuYW1lXCIsIFwiZXhwb3J0ZWROYW1lXCIpKV0sIFtpc01ldGhvZCwgUi5hbHdheXMoTGlzdC5vZihcImJvZHlcIiwgXCJpc0dlbmVyYXRvclwiLCBcInBhcmFtc1wiKSldLCBbaXNHZXR0ZXIsIFIuYWx3YXlzKExpc3Qub2YoXCJib2R5XCIpKV0sIFtpc1NldHRlciwgUi5hbHdheXMoTGlzdC5vZihcImJvZHlcIiwgXCJwYXJhbVwiKSldLCBbaXNEYXRhUHJvcGVydHksIFIuYWx3YXlzKExpc3Qub2YoXCJuYW1lXCIsIFwiZXhwcmVzc2lvblwiKSldLCBbaXNTaG9ydGhhbmRQcm9wZXJ0eSwgUi5hbHdheXMoTGlzdC5vZihcImV4cHJlc3Npb25cIikpXSwgW2lzU3RhdGljUHJvcGVydHlOYW1lLCBSLmFsd2F5cyhMaXN0Lm9mKFwidmFsdWVcIikpXSwgW2lzTGl0ZXJhbEJvb2xlYW5FeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwidmFsdWVcIikpXSwgW2lzTGl0ZXJhbEluZmluaXR5RXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdCgpKV0sIFtpc0xpdGVyYWxOdWxsRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdCgpKV0sIFtpc0xpdGVyYWxOdW1lcmljRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcInZhbHVlXCIpKV0sIFtpc0xpdGVyYWxSZWdFeHBFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwicGF0dGVyblwiLCBcImZsYWdzXCIpKV0sIFtpc0xpdGVyYWxTdHJpbmdFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwidmFsdWVcIikpXSwgW2lzQXJyYXlFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwiZWxlbWVudHNcIikpXSwgW2lzQXJyb3dFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwicGFyYW1zXCIsIFwiYm9keVwiKSldLCBbaXNBc3NpZ25tZW50RXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcImJpbmRpbmdcIiwgXCJleHByZXNzaW9uXCIpKV0sIFtpc0JpbmFyeUV4cHJlc3Npb24sIFIuYWx3YXlzKExpc3Qub2YoXCJvcGVyYXRvclwiLCBcImxlZnRcIiwgXCJyaWdodFwiKSldLCBbaXNDYWxsRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcImNhbGxlZVwiLCBcImFyZ3VtZW50c1wiKSldLCBbaXNDb21wdXRlZEFzc2lnbm1lbnRFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwib3BlcmF0b3JcIiwgXCJiaW5kaW5nXCIsIFwiZXhwcmVzc2lvblwiKSldLCBbaXNDb21wdXRlZE1lbWJlckV4cHJlc3Npb24sIFIuYWx3YXlzKExpc3Qub2YoXCJvYmplY3RcIiwgXCJleHByZXNzaW9uXCIpKV0sIFtpc0NvbmRpdGlvbmFsRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcInRlc3RcIiwgXCJjb25zZXF1ZW50XCIsIFwiYWx0ZXJuYXRlXCIpKV0sIFtpc0Z1bmN0aW9uRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcIm5hbWVcIiwgXCJpc0dlbmVyYXRvclwiLCBcInBhcmFtc1wiLCBcImJvZHlcIikpXSwgW2lzSWRlbnRpZmllckV4cHJlc3Npb24sIFIuYWx3YXlzKExpc3Qub2YoXCJuYW1lXCIpKV0sIFtpc05ld0V4cHJlc3Npb24sIFIuYWx3YXlzKExpc3Qub2YoXCJjYWxsZWVcIiwgXCJhcmd1bWVudHNcIikpXSwgW2lzTmV3VGFyZ2V0RXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdCgpKV0sIFtpc09iamVjdEV4cHJlc3Npb24sIFIuYWx3YXlzKExpc3Qub2YoXCJwcm9wZXJ0aWVzXCIpKV0sIFtpc1VuYXJ5RXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcIm9wZXJhdG9yXCIsIFwib3BlcmFuZFwiKSldLCBbaXNTdGF0aWNNZW1iZXJFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwib2JqZWN0XCIsIFwicHJvcGVydHlcIikpXSwgW2lzVGVtcGxhdGVFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwidGFnXCIsIFwiZWxlbWVudHNcIikpXSwgW2lzVGhpc0V4cHJlc3Npb24sIFIuYWx3YXlzKExpc3QoKSldLCBbaXNZaWVsZEV4cHJlc3Npb24sIFIuYWx3YXlzKExpc3Qub2YoXCJleHByZXNzaW9uXCIpKV0sIFtpc1lpZWxkR2VuZXJhdG9yRXhwcmVzc2lvbiwgUi5hbHdheXMoTGlzdC5vZihcImV4cHJlc3Npb25cIikpXSwgW2lzQmxvY2tTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3Qub2YoXCJibG9ja1wiKSldLCBbaXNCcmVha1N0YXRlbWVudCwgUi5hbHdheXMoTGlzdC5vZihcImxhYmVsXCIpKV0sIFtpc0NvbnRpbnVlU3RhdGVtZW50LCBSLmFsd2F5cyhMaXN0Lm9mKFwibGFiZWxcIikpXSwgW2lzRGVidWdnZXJTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3QoKSldLCBbaXNEb1doaWxlU3RhdGVtZW50LCBSLmFsd2F5cyhMaXN0Lm9mKFwidGVzdFwiLCBcImJvZHlcIikpXSwgW2lzRW1wdHlTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3QoKSldLCBbaXNFeHByZXNzaW9uU3RhdGVtZW50LCBSLmFsd2F5cyhMaXN0Lm9mKFwiZXhwcmVzc2lvblwiKSldLCBbaXNGb3JJblN0YXRlbWVudCwgUi5hbHdheXMoTGlzdC5vZihcImxlZnRcIiwgXCJyaWdodFwiLCBcImJvZHlcIikpXSwgW2lzRm9yT2ZTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3Qub2YoXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJib2R5XCIpKV0sIFtpc0ZvclN0YXRlbWVudCwgUi5hbHdheXMoTGlzdC5vZihcImluaXRcIiwgXCJ0ZXN0XCIsIFwidXBkYXRlXCIsIFwiYm9keVwiKSldLCBbaXNMYWJlbGVkU3RhdGVtZW50LCBSLmFsd2F5cyhMaXN0Lm9mKFwibGFiZWxcIiwgXCJib2R5XCIpKV0sIFtpc1JldHVyblN0YXRlbWVudCwgUi5hbHdheXMoTGlzdC5vZihcImV4cHJlc3Npb25cIikpXSwgW2lzU3dpdGNoU3RhdGVtZW50V2l0aERlZmF1bHQsIFIuYWx3YXlzKExpc3Qub2YoXCJkaXNjcmltaW5hbnRcIiwgXCJwcmVEZWZhdWx0Q2FzZXNcIiwgXCJkZWZhdWx0Q2FzZVwiLCBcInBvc3REZWZhdWx0Q2FzZXNcIikpXSwgW2lzVGhyb3dTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3Qub2YoXCJleHByZXNzaW9uXCIpKV0sIFtpc1RyeUNhdGNoU3RhdGVtZW50LCBSLmFsd2F5cyhMaXN0Lm9mKFwiYm9keVwiLCBcImNhdGNoQ2xhdXNlXCIpKV0sIFtpc1RyeUZpbmFsbHlTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3Qub2YoXCJib2R5XCIsIFwiY2F0Y2hDbGF1c2VcIiwgXCJmaW5hbGl6ZXJcIikpXSwgW2lzVmFyaWFibGVEZWNsYXJhdGlvblN0YXRlbWVudCwgUi5hbHdheXMoTGlzdC5vZihcImRlY2xhcmF0aW9uXCIpKV0sIFtpc1dpdGhTdGF0ZW1lbnQsIFIuYWx3YXlzKExpc3Qub2YoXCJvYmplY3RcIiwgXCJib2R5XCIpKV0sIFtpc0Jsb2NrLCBSLmFsd2F5cyhMaXN0Lm9mKFwic3RhdGVtZW50c1wiKSldLCBbaXNDYXRjaENsYXVzZSwgUi5hbHdheXMoTGlzdC5vZihcImJpbmRpbmdcIiwgXCJib2R5XCIpKV0sIFtpc0RpcmVjdGl2ZSwgUi5hbHdheXMoTGlzdC5vZihcInJhd1ZhbHVlXCIpKV0sIFtpc0Zvcm1hbFBhcmFtZXRlcnMsIFIuYWx3YXlzKExpc3Qub2YoXCJpdGVtc1wiLCBcInJlc3RcIikpXSwgW2lzRnVuY3Rpb25Cb2R5LCBSLmFsd2F5cyhMaXN0Lm9mKFwiZGlyZWN0aXZlc1wiLCBcInN0YXRlbWVudHNcIikpXSwgW2lzRnVuY3Rpb25EZWNsYXJhdGlvbiwgUi5hbHdheXMoTGlzdC5vZihcIm5hbWVcIiwgXCJpc0dlbmVyYXRvclwiLCBcInBhcmFtc1wiLCBcImJvZHlcIikpXSwgW2lzU2NyaXB0LCBSLmFsd2F5cyhMaXN0Lm9mKFwiZGlyZWN0aXZlc1wiLCBcInN0YXRlbWVudHNcIikpXSwgW2lzU3ByZWFkRWxlbWVudCwgUi5hbHdheXMoTGlzdC5vZihcImV4cHJlc3Npb25cIikpXSwgW2lzU3VwZXIsIFIuYWx3YXlzKExpc3QoKSldLCBbaXNTd2l0Y2hDYXNlLCBSLmFsd2F5cyhMaXN0Lm9mKFwidGVzdFwiLCBcImNvbnNlcXVlbnRcIikpXSwgW2lzU3dpdGNoRGVmYXVsdCwgUi5hbHdheXMoTGlzdC5vZihcImNvbnNlcXVlbnRcIikpXSwgW2lzVGVtcGxhdGVFbGVtZW50LCBSLmFsd2F5cyhMaXN0Lm9mKFwicmF3VmFsdWVcIikpXSwgW2lzU3ludGF4VGVtcGxhdGUsIFIuYWx3YXlzKExpc3Qub2YoXCJ0ZW1wbGF0ZVwiKSldLCBbaXNWYXJpYWJsZURlY2xhcmF0aW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwia2luZFwiLCBcImRlY2xhcmF0b3JzXCIpKV0sIFtpc1ZhcmlhYmxlRGVjbGFyYXRvciwgUi5hbHdheXMoTGlzdC5vZihcImJpbmRpbmdcIiwgXCJpbml0XCIpKV0sIFtpc1BhcmVudGhlc2l6ZWRFeHByZXNzaW9uLCBSLmFsd2F5cyhMaXN0Lm9mKFwiaW5uZXJcIikpXSwgW1IuVCwgdHlwZV84NzggPT4gYXNzZXJ0KGZhbHNlLCBcIk1pc3NpbmcgY2FzZSBpbiBmaWVsZHM6IFwiICsgdHlwZV84NzgudHlwZSldXSk7XG4iXX0=