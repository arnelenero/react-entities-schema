import PropTypes from 'prop-types';

import T from '../src/types';
import initialStateFromSchema from '../src/initialStateFromSchema';

describe('initialStateFromSchema', () => {
  it('assigns T.array an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.array });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.array.isRequired an initial value of []', () => {
    const initialState = initialStateFromSchema({ prop: T.array.isRequired });
    expect(initialState.prop).toEqual([]);
  });

  it('assigns T.bool an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.bool });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.bool.isRequired an initial value of false', () => {
    const initialState = initialStateFromSchema({ prop: T.bool.isRequired });
    expect(initialState.prop).toBe(false);
  });

  it('assigns T.func an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.func });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.func.isRequired an initial value of () => {}', () => {
    const initialState = initialStateFromSchema({ prop: T.func.isRequired });
    expect(typeof initialState.prop).toBe('function');
  });

  it('assigns T.number an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.number });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.number.isRequired an initial value of 0', () => {
    const initialState = initialStateFromSchema({ prop: T.number.isRequired });
    expect(initialState.prop).toBe(0);
  });

  it('assigns T.object an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.object });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.object.isRequired an initial value of {}', () => {
    const initialState = initialStateFromSchema({ prop: T.object.isRequired });
    expect(initialState.prop).toEqual({});
  });

  it('assigns T.string an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.string });
    expect(initialState.prop).toBeNull();
  });
  it("assigns T.string.isRequired an initial value of ''", () => {
    const initialState = initialStateFromSchema({ prop: T.string.isRequired });
    expect(initialState.prop).toBe('');
  });

  it('assigns T.symbol an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.symbol });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.symbol.isRequired an initial value of symbol type', () => {
    const initialState = initialStateFromSchema({ prop: T.symbol.isRequired });
    expect(typeof initialState.prop).toBe('symbol');
  });

  it('assigns T.node an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.node });
    expect(initialState.prop).toBeNull();
  });
  it("assigns T.node.isRequired an initial value of ''", () => {
    const initialState = initialStateFromSchema({ prop: T.node.isRequired });
    expect(initialState.prop).toBe('');
  });

  it('assigns T.element an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.element });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.element.isRequired an initial value of object type', () => {
    const initialState = initialStateFromSchema({ prop: T.element.isRequired });
    expect(typeof initialState.prop).toBe('object');
  });

  it('assigns T.elementType an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.elementType });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.elementType.isRequired an initial value of function type', () => {
    const initialState = initialStateFromSchema({
      prop: T.elementType.isRequired,
    });
    expect(typeof initialState.prop).toBe('function');
  });

  it('assigns T.instanceOf(C) an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.instanceOf(Array) });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.instanceOf(C).isRequired an initial value of an instance of C', () => {
    const initialState = initialStateFromSchema({
      prop: T.instanceOf(Array).isRequired,
    });
    expect(initialState.prop).toBeInstanceOf(Array);
  });

  it('assigns T.oneOf([1, 2, 3]) an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.oneOf([1, 2, 3]) });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.oneOf([1, 2, 3]).isRequired an initial value of 1', () => {
    const initialState = initialStateFromSchema({
      prop: T.oneOf([1, 2, 3]).isRequired,
    });
    expect(initialState.prop).toBe(1);
  });

  it('assigns T.oneOfType([T.number, T.string, T.bool]) an initial value of null', () => {
    const initialState = initialStateFromSchema({
      prop: T.oneOfType([T.number, T.string, T.bool]),
    });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.oneOfType([T.number, T.string, T.bool]).isRequired an initial value of number type', () => {
    const initialState = initialStateFromSchema({
      prop: T.oneOfType([T.number, T.string, T.bool]).isRequired,
    });
    expect(typeof initialState.prop).toBe('number');
  });

  it('assigns T.arrayOf() an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.arrayOf(T.string) });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.arrayOf().isRequired an initial value of []', () => {
    const initialState = initialStateFromSchema({
      prop: T.arrayOf(T.string).isRequired,
    });
    expect(initialState.prop).toEqual([]);
  });

  it('assigns T.objectOf() an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.objectOf(T.string) });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.objectOf().isRequired an initial value of {}', () => {
    const initialState = initialStateFromSchema({
      prop: T.objectOf(T.string).isRequired,
    });
    expect(initialState.prop).toEqual({});
  });

  it('assigns T.shape() an initial value of null', () => {
    const initialState = initialStateFromSchema({
      prop: T.shape({ s: T.string.isRequired, n: T.number }),
    });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.shape().isRequired an initial value of object with all specified props initialized', () => {
    const initialState = initialStateFromSchema({
      prop: T.shape({ s: T.string.isRequired, n: T.number }).isRequired,
    });
    expect(initialState.prop).toEqual({ s: '', n: null });
  });

  it('assigns T.exact() an initial value of null', () => {
    const initialState = initialStateFromSchema({
      prop: T.exact({ s: T.string.isRequired, n: T.number }),
    });
    expect(initialState.prop).toBeNull();
  });
  it('assigns T.exact().isRequired an initial value of object with all specified props initialized', () => {
    const initialState = initialStateFromSchema({
      prop: T.exact({ s: T.string.isRequired, n: T.number }).isRequired,
    });
    expect(initialState.prop).toEqual({ s: '', n: null });
  });

  it('assigns T.any an initial value of null', () => {
    const initialState = initialStateFromSchema({ prop: T.any });
    expect(initialState.prop).toBeNull();
  });
  it("assigns T.any.isRequired an initial value of ''", () => {
    const initialState = initialStateFromSchema({ prop: T.any.isRequired });
    expect(initialState.prop).toBe('');
  });

  it('throws an error if an invalid schema is specified', () => {
    initialStateFromSchema({ prop: T.boolean });
    expect(() => {
      initialStateFromSchema({ prop: T.boolean });
    }).toThrow();
  });
});
