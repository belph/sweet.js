import Syntax, { makeIdentifier } from "../src/syntax";
import expect from "expect.js";
import { Scope, freshScope } from "../src/scope";
import BindingMap from "../src/binding-map";

import Reader from "../src/shift-reader";
import { serializer, makeDeserializer } from "../src/serializer";

import { Symbol, gensym } from "../src/symbol";


describe('syntax objects', () => {
  it('that have no bindings or scopes should resolve to their original name ', () => {
    let foo = makeIdentifier('foo');
    expect(foo.resolve()).to.be('foo');
  });

  it('where one identifier has a scope and associated binding and the other does not will resolve to different names', () => {
      let bindings = new BindingMap();
      let scope1 = freshScope("1");

      let foo = makeIdentifier('foo');
      let foo_1 = makeIdentifier('foo');

      foo_1 = foo_1.addScope(scope1, bindings);

      bindings.add(foo_1, { binding: gensym('foo') });

      expect(foo.resolve()).to.not.be(foo_1.resolve());
    });

  it('resolve to different bindings when both identifiers have a binding on a different scope', () => {
      let bindings = new BindingMap();
      let scope1 = freshScope("1");
      let scope2 = freshScope("2");

      let foo_1 = makeIdentifier('foo');
      let foo_2 = makeIdentifier('foo');

      foo_1 = foo_1.addScope(scope1, bindings);
      foo_2 = foo_2.addScope(scope2, bindings);

      bindings.add(foo_1, {binding: gensym('foo')});
      bindings.add(foo_2, { binding: gensym('foo')});

      expect(foo_1.resolve()).to.not.be(foo_2.resolve());
    });

  it('should resolve when syntax object has a scopeset that is a superset of the binding', () => {
      let bindings = new BindingMap();
      let scope1 = freshScope("1");
      let scope2 = freshScope("2");
      let scope3 = freshScope("3");

      let foo_1 = makeIdentifier('foo');
      let foo_123 = makeIdentifier('foo');

      foo_1 = foo_1.addScope(scope1, bindings);

      foo_123 = foo_123.addScope(scope1, bindings)
        .addScope(scope2, bindings)
        .addScope(scope3, bindings);

      bindings.add(foo_1, {binding: gensym('foo')});

      expect(foo_1.resolve()).to.be(foo_123.resolve());
    });

  it('should throw an error for ambiguous scops sets', () => {
    let bindings = new BindingMap();
    let scope1 = freshScope("1");
    let scope2 = freshScope("2");
    let scope3 = freshScope("3");

    let foo_13 = makeIdentifier('foo');
    let foo_12 = makeIdentifier('foo');
    let foo_123 = makeIdentifier('foo');

    foo_13 = foo_13.addScope(scope1, bindings)
      .addScope(scope3, bindings);

    foo_12 = foo_12.addScope(scope1, bindings)
      .addScope(scope2, bindings);

    foo_123 = foo_123.addScope(scope1, bindings)
      .addScope(scope2, bindings)
      .addScope(scope3, bindings);

    bindings.add(foo_13, {binding: gensym('foo')});
    bindings.add(foo_12, {binding: gensym('foo')});

    expect(() => foo_123.resolve()).to.throwError();
  });
});

describe('serializing', () => {
  let deserializer = makeDeserializer();
  it('should work for a numeric literal', () => {
    let reader = new Reader("42");
    let json = serializer.write(reader.read());
    let stxl = deserializer.read(json);

    expect(stxl.get(0).isNumericLiteral()).to.be(true);
    expect(stxl.get(0).val()).to.be(42);
  });

  it('should work for a string literal', () => {
    let reader = new Reader("'foo'");
    let json = serializer.write(reader.read());
    let stxl = deserializer.read(json);

    expect(stxl.get(0).isStringLiteral()).to.be(true);
    expect(stxl.get(0).val()).to.be('foo');
  });

  it('should work for a paren delimiter', () => {
    let reader = new Reader("( 42 )");
    let json = serializer.write(reader.read());
    let stxl = deserializer.read(json);

    expect(stxl.get(0).isParenDelimiter()).to.be(true);
    expect(stxl.get(0).inner().get(0).isNumericLiteral()).to.be(true);
    expect(stxl.get(0).inner().get(0).val()).to.be(42);
  });

  it('should work for an identifier', () => {
    let reader = new Reader("foo");
    let json = serializer.write(reader.read());
    let stxl = deserializer.read(json);

    expect(stxl.get(0).isIdentifier()).to.be(true);
    expect(stxl.get(0).val()).to.be('foo');
  });

  it('should work for a scope', () => {
    let bindings = new BindingMap();
    let scope = freshScope("1");

    let rtScope = deserializer.read(serializer.write(scope));
    expect(scope).to.be(rtScope);
  });

  it('should work for an identifier with a scope', () => {
    let bindings = new BindingMap();
    let scope1 = freshScope("1");
    let deserializer = makeDeserializer(bindings);

    let foo = makeIdentifier('foo');
    foo = foo.addScope(scope1, bindings);

    bindings.add(foo, {binding: gensym('foo')});

    let rtFoo = deserializer.read(serializer.write(foo));

    expect(rtFoo.resolve()).to.be(foo.resolve());
  });
});
