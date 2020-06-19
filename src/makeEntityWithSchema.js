import { makeEntity } from 'react-entities';
import PropTypes from 'prop-types';

import initialStateFromSchema from './initialStateFromSchema';
import { extractPropTypes } from './types';

export const makeEntityWithSchema = (
  { initialState, schema, name = 'entity', ...actions },
  deps
) => {
  if (typeof schema !== 'object')
    throw new Error('Schema expected for entity.');

  const options = {};

  if (process.env.NODE_ENV !== 'production') {
    const strictSchema = {
      state: PropTypes.exact(extractPropTypes(schema)),
    };

    const validatePropTypes = (currentState, updates) => {
      const newState = { ...currentState, ...updates };
      PropTypes.checkPropTypes(
        strictSchema,
        { state: newState },
        'entity state',
        name
      );
    };

    options.beforeSetState = validatePropTypes;

    // Also validate the provided initial state (if any)
    if (initialState) validatePropTypes({}, initialState);
  }

  return makeEntity(
    {
      initialState: initialState || initialStateFromSchema(schema),
      options,
      ...actions,
    },
    deps
  );
};

export default makeEntityWithSchema;
