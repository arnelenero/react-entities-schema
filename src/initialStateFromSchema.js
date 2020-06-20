import { createElement } from 'react';

export const initializers = {
  array: () => [],
  bool: () => false,
  func: () => () => {},
  number: () => 0,
  object: () => ({}),
  string: () => '',
  symbol: () => Symbol(),
  node: () => '',
  element: () => createElement('div'),
  elementType: () => () => createElement('div'),

  instanceOf: arg => new arg(),
  oneOf: arg => arg[0],
  oneOfType: arg => initProp(arg[0], true),
  arrayOf: () => [],
  objectOf: () => ({}),
  shape: arg => initStruct(arg),
  exact: arg => initStruct(arg),

  any: () => '',
};

export const initProp = (type, force) => {
  if (!type || !type.name) throw new Error('Invalid entity schema');

  // A bit confusing but a required type is NOT expected to have an `isRequired` option
  const required = type.isRequired === undefined;

  const init = initializers[type.name];
  if (typeof init !== 'function') throw new Error('Invalid entity schema');

  return required || force ? init(type.arg) : null;
};

export const initStruct = struct => {
  const o = {};
  for (let key in struct) {
    o[key] = initProp(struct[key]);
  }
  return o;
};

export const initialStateFromSchema = schema => {
  return initStruct(schema);
};

export default initialStateFromSchema;
