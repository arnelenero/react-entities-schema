import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useEntityBoundary } from 'react-entities';

import makeEntityWithSchema from '../src/makeEntityWithSchema';
import T from '../src/types';

let hookValue = null;
let serverHookValue = null;
let prodHookValue = null;
let component = null;

let useCounter = null;
let useServerData = null;
let useProdEntity = null;

const CounterView = () => {
  useEntityBoundary();

  hookValue = useCounter();
  serverHookValue = useServerData();
  prodHookValue = useProdEntity();

  return null;
};

beforeAll(() => {
  const schema = {
    value: T.number.isRequired,
    wasReset: T.bool,
    secret: T.string,
  };

  const initialState = {
    value: 1,
    wasReset: false,
  };

  const increment = counter => () => {
    counter.setState({ value: counter.state.value + 1 });
  };

  const decrement = counter => () => {
    counter.setState({ value: counter.state.value - 1 });
  };

  const reset = counter => () => {
    counter.setState({ value: 0, wasReset: true });
  };

  const callService = (counter, svc) => () => {
    counter.setState({ secret: svc.getSecret() });
  };

  const hasBeenReset = counter => () => {
    return counter.state.wasReset;
  };

  const service = {
    getSecret: () => '1234',
  };

  const setInvalidValue = counter => () => {
    counter.setState({ value: 'invalid counter, not a number' });
  };

  const setInvalidProp = counter => () => {
    counter.setState({ meta: 'unknown prop key' });
  };

  useCounter = makeEntityWithSchema(
    {
      name: 'counter',
      schema,
      initialState,
      increment,
      decrement,
      reset,
      callService,
      hasBeenReset,
      setInvalidValue,
      setInvalidProp,
      id: 'Counter',
    },
    service
  );

  useServerData = makeEntityWithSchema({
    name: 'serverData',
    schema,
    fetch: serverData => () => {},
  });

  process.env.NODE_ENV = 'production';
  useProdEntity = makeEntityWithSchema({
    schema,
    setInvalidValue,
    setInvalidProp,
  });
  process.env.NODE_ENV = 'test';
});

beforeEach(() => {
  component = mount(<CounterView />);
});

afterEach(() => {
  if (component.exists()) component.unmount();
});

describe('makeEntity', () => {
  it('returns an entity hook function', () => {
    expect(useCounter).toBeInstanceOf(Function);
    expect(hookValue).toBeInstanceOf(Array);
    expect(hookValue).toHaveLength(2);
  });

  it('sets the initial state of the entity if value is provided', () => {
    const counter = hookValue[0];
    expect(counter).toHaveProperty('value', 1);
  });

  it('sets a default (based on schema) if initial state is not provided', () => {
    const serverData = serverHookValue[0];
    expect(serverData).toHaveProperty('value');
  });

  it('requires a schema to be defined', () => {
    expect(() => {
      makeEntityWithSchema({
        initialState: { value: 0 },
        setValue: counter => val => counter.setState({ value: val }),
      });
    }).toThrow();
  });

  it('passes the current state of the entity to actions in the argument object', () => {
    const { hasBeenReset } = hookValue[1];
    const wasReset = hasBeenReset();
    expect(wasReset).toBeDefined();
    expect(wasReset).toBe(false);
  });

  it('passes the `setState` of the entity to actions in the argument object', () => {
    const { reset, hasBeenReset } = hookValue[1];
    act(() => {
      reset();
    });
    const wasReset = hasBeenReset();
    expect(wasReset).toBe(true);
  });

  it('requires each action to be a higher-order function', () => {
    const invalidAction = (counter, value) => {};
    expect(() => {
      makeEntityWithSchema({
        name: 'invalidEntity',
        schema: { value: T.number.isRequired },
        invalidAction,
      });
    }).toThrow();
  });

  it('enables checking for invalid prop type on each state update by `setState`', () => {
    const { setInvalidValue } = hookValue[1];
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;
    act(() => {
      setInvalidValue();
    });
    console.error = originalConsoleError;
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('enables checking for invalid prop key on each state update by `setState`', () => {
    const { setInvalidProp } = hookValue[1];
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;
    act(() => {
      setInvalidProp();
    });
    console.error = originalConsoleError;
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('bypasses all prop type checking on Production builds', () => {
    const { setInvalidValue, setInvalidProp } = prodHookValue[1];
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;
    act(() => {
      setInvalidValue();
      setInvalidProp();
    });
    console.error = originalConsoleError;
    expect(mockConsoleError).not.toHaveBeenCalled();
  });

  it('discards non-functions apart from `initialState` and `schema` in entity spec', () => {
    expect(hookValue[0]).not.toHaveProperty('id');
    expect(hookValue[1]).not.toHaveProperty('id');
  });

  it('allows injecting dependencies into the entity', () => {
    const { callService } = hookValue[1];
    act(() => {
      callService();
    });
    const counter = hookValue[0];
    expect(counter).toHaveProperty('secret', '1234');
  });
});
