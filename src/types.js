import PropTypes from 'prop-types';

export const types = [
  'array',
  'bool',
  'func',
  'number',
  'object',
  'string',
  'symbol',
  'node',
  'element',
  'elementType',
  'instanceOf',
  'oneOf',
  'oneOfType',
  'arrayOf',
  'objectOf',
  'shape',
  'exact',
  'any',
];

export const factory = () => {
  const T = { checkPropTypes };

  for (let i = 0; i < types.length; i++) {
    const name = types[i];
    const propType = PropTypes[name];
    const hasArg = propType.isRequired === undefined;

    if (!hasArg) {
      T[name] = { name, propType };
      T[name].isRequired = { name, propType: propType.isRequired };
    } else {
      T[name] = arg => {
        const result = propType(extractPropTypes(arg));
        const typedef = { name, arg, propType: result };
        typedef.isRequired = { name, arg, propType: result.isRequired };
        return typedef;
      };
    }
  }

  return T;
};

export const checkPropTypes = (schema, ...rest) => {
  const typeSpecs = extractPropTypes(schema);
  return PropTypes.checkPropTypes(typeSpecs, ...rest);
};

export const extractPropTypes = arg => {
  const extract = val => (val && val.propType) || val;
  const isTypeObject = arg.propType && arg.name;

  if (typeof arg === 'object') {
    if (arg instanceof Array) {
      return arg.map(extract);
    } else if (isTypeObject) {
      return extract(arg);
    } else {
      const res = {};
      for (let key in arg) {
        res[key] = extract(arg[key]);
      }
      return res;
    }
  } else {
    return arg;
  }
};

export const T = factory();

export default T;
