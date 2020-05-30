import PropTypes from 'prop-types';
import T from '../src/types';

describe('T', () => {
  it('wraps PropTypes.array', () => {
    expect(T.array).toBeDefined();
    expect(T.array).toHaveProperty('name', 'array');
    expect(T.array).toHaveProperty('propType', PropTypes.array);
  });
  it('wraps PropTypes.array.isRequired', () => {
    expect(T.array.isRequired).toBeDefined();
    expect(T.array.isRequired).toHaveProperty('name', 'array');
    expect(T.array.isRequired).toHaveProperty(
      'propType',
      PropTypes.array.isRequired
    );
  });

  it('wraps PropTypes.bool', () => {
    expect(T.bool).toBeDefined();
    expect(T.bool).toHaveProperty('name', 'bool');
    expect(T.bool).toHaveProperty('propType', PropTypes.bool);
  });
  it('wraps PropTypes.bool.isRequired', () => {
    expect(T.bool.isRequired).toBeDefined();
    expect(T.bool.isRequired).toHaveProperty('name', 'bool');
    expect(T.bool.isRequired).toHaveProperty(
      'propType',
      PropTypes.bool.isRequired
    );
  });

  it('wraps PropTypes.func', () => {
    expect(T.func).toBeDefined();
    expect(T.func).toHaveProperty('name', 'func');
    expect(T.func).toHaveProperty('propType', PropTypes.func);
  });
  it('wraps PropTypes.func.isRequired', () => {
    expect(T.func.isRequired).toBeDefined();
    expect(T.func.isRequired).toHaveProperty('name', 'func');
    expect(T.func.isRequired).toHaveProperty(
      'propType',
      PropTypes.func.isRequired
    );
  });

  it('wraps PropTypes.number', () => {
    expect(T.number).toBeDefined();
    expect(T.number).toHaveProperty('name', 'number');
    expect(T.number).toHaveProperty('propType', PropTypes.number);
  });
  it('wraps PropTypes.number.isRequired', () => {
    expect(T.number.isRequired).toBeDefined();
    expect(T.number.isRequired).toHaveProperty('name', 'number');
    expect(T.number.isRequired).toHaveProperty(
      'propType',
      PropTypes.number.isRequired
    );
  });

  it('wraps PropTypes.object', () => {
    expect(T.object).toBeDefined();
    expect(T.object).toHaveProperty('name', 'object');
    expect(T.object).toHaveProperty('propType', PropTypes.object);
  });
  it('wraps PropTypes.object.isRequired', () => {
    expect(T.object.isRequired).toBeDefined();
    expect(T.object.isRequired).toHaveProperty('name', 'object');
    expect(T.object.isRequired).toHaveProperty(
      'propType',
      PropTypes.object.isRequired
    );
  });

  it('wraps PropTypes.string', () => {
    expect(T.string).toBeDefined();
    expect(T.string).toHaveProperty('name', 'string');
    expect(T.string).toHaveProperty('propType', PropTypes.string);
  });
  it('wraps PropTypes.string.isRequired', () => {
    expect(T.string.isRequired).toBeDefined();
    expect(T.string.isRequired).toHaveProperty('name', 'string');
    expect(T.string.isRequired).toHaveProperty(
      'propType',
      PropTypes.string.isRequired
    );
  });

  it('wraps PropTypes.symbol', () => {
    expect(T.symbol).toBeDefined();
    expect(T.symbol).toHaveProperty('name', 'symbol');
    expect(T.symbol).toHaveProperty('propType', PropTypes.symbol);
  });
  it('wraps PropTypes.symbol.isRequired', () => {
    expect(T.symbol.isRequired).toBeDefined();
    expect(T.symbol.isRequired).toHaveProperty('name', 'symbol');
    expect(T.symbol.isRequired).toHaveProperty(
      'propType',
      PropTypes.symbol.isRequired
    );
  });

  it('wraps PropTypes.node', () => {
    expect(T.node).toBeDefined();
    expect(T.node).toHaveProperty('name', 'node');
    expect(T.node).toHaveProperty('propType', PropTypes.node);
  });
  it('wraps PropTypes.node.isRequired', () => {
    expect(T.node.isRequired).toBeDefined();
    expect(T.node.isRequired).toHaveProperty('name', 'node');
    expect(T.node.isRequired).toHaveProperty(
      'propType',
      PropTypes.node.isRequired
    );
  });

  it('wraps PropTypes.element', () => {
    expect(T.element).toBeDefined();
    expect(T.element).toHaveProperty('name', 'element');
    expect(T.element).toHaveProperty('propType', PropTypes.element);
  });
  it('wraps PropTypes.element.isRequired', () => {
    expect(T.element.isRequired).toBeDefined();
    expect(T.element.isRequired).toHaveProperty('name', 'element');
    expect(T.element.isRequired).toHaveProperty(
      'propType',
      PropTypes.element.isRequired
    );
  });

  it('wraps PropTypes.elementType', () => {
    expect(T.elementType).toBeDefined();
    expect(T.elementType).toHaveProperty('name', 'elementType');
    expect(T.elementType).toHaveProperty('propType', PropTypes.elementType);
  });
  it('wraps PropTypes.elementType.isRequired', () => {
    expect(T.elementType.isRequired).toBeDefined();
    expect(T.elementType.isRequired).toHaveProperty('name', 'elementType');
    expect(T.elementType.isRequired).toHaveProperty(
      'propType',
      PropTypes.elementType.isRequired
    );
  });

  it('wraps PropTypes.any', () => {
    expect(T.any).toBeDefined();
    expect(T.any).toHaveProperty('name', 'any');
    expect(T.any).toHaveProperty('propType', PropTypes.any);
  });
  it('wraps PropTypes.any.isRequired', () => {
    expect(T.any.isRequired).toBeDefined();
    expect(T.any.isRequired).toHaveProperty('name', 'any');
    expect(T.any.isRequired).toHaveProperty(
      'propType',
      PropTypes.any.isRequired
    );
  });

  it('wraps PropTypes.instanceOf', () => {
    expect(T.instanceOf).toBeInstanceOf(Function);
    const arg = Array;
    const type = T.instanceOf(arg);
    expect(type).toHaveProperty('name', 'instanceOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.instanceOf.isRequired', () => {
    const arg = Array;
    const type = T.instanceOf(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'instanceOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.oneOf', () => {
    expect(T.oneOf).toBeInstanceOf(Function);
    const arg = ['a', 'b', 'c'];
    const type = T.oneOf(arg);
    expect(type).toHaveProperty('name', 'oneOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.oneOf.isRequired', () => {
    const arg = ['a', 'b', 'c'];
    const type = T.oneOf(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'oneOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.oneOfType', () => {
    expect(T.oneOfType).toBeInstanceOf(Function);
    const arg = [T.string, T.number];
    const type = T.oneOfType(arg);
    expect(type).toHaveProperty('name', 'oneOfType');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.oneOfType.isRequired', () => {
    const arg = [T.string, T.number];
    const type = T.oneOfType(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'oneOfType');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.arrayOf', () => {
    expect(T.arrayOf).toBeInstanceOf(Function);
    const arg = T.string;
    const type = T.arrayOf(arg);
    expect(type).toHaveProperty('name', 'arrayOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.arrayOf.isRequired', () => {
    const arg = T.string;
    const type = T.arrayOf(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'arrayOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.objectOf', () => {
    expect(T.objectOf).toBeInstanceOf(Function);
    const arg = T.string;
    const type = T.objectOf(arg);
    expect(type).toHaveProperty('name', 'objectOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.objectOf.isRequired', () => {
    const arg = T.string;
    const type = T.objectOf(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'objectOf');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.shape', () => {
    expect(T.shape).toBeInstanceOf(Function);
    const arg = { name: T.string, age: T.number };
    const type = T.shape(arg);
    expect(type).toHaveProperty('name', 'shape');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.shape.isRequired', () => {
    const arg = { name: T.string, age: T.number };
    const type = T.shape(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'shape');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.exact', () => {
    expect(T.exact).toBeInstanceOf(Function);
    const arg = { name: T.string, age: T.number };
    const type = T.exact(arg);
    expect(type).toHaveProperty('name', 'exact');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });
  it('wraps PropTypes.exact.isRequired', () => {
    const arg = { name: T.string, age: T.number };
    const type = T.exact(arg).isRequired;
    expect(type).toBeDefined();
    expect(type).toHaveProperty('name', 'exact');
    expect(type).toHaveProperty('arg', arg);
    expect(type.propType).toBeInstanceOf(Function);
  });

  it('wraps PropTypes.checkPropTypes', () => {
    expect(T.checkPropTypes).toBeInstanceOf(Function);
    expect(() =>
      T.checkPropTypes({ name: T.string }, { name: 'Arnel' })
    ).not.toThrow();
  });
});
