# React Entities Schema

[![npm](https://img.shields.io/npm/v/react-entities-schema)](https://www.npmjs.com/package/react-entities-schema)
[![build](https://img.shields.io/travis/arnelenero/react-entities-schema)](https://travis-ci.org/github/arnelenero/react-entities-schema)
[![coverage](https://img.shields.io/coveralls/github/arnelenero/react-entities-schema)](https://coveralls.io/github/arnelenero/react-entities-schema)
[![license](https://img.shields.io/github/license/arnelenero/react-entities)](https://opensource.org/licenses/MIT)

React Entities Schema is an add-on to React Entities that performs runtime type checking on your app state using PropTypes.

## Setup

To install:
```
npm install react-entities-schema
```

You also need to install React Entities and PropTypes, if you haven't done so yet:
```
npm install react-entities
npm install prop-types
```

## Getting Started

This documentation assumes that you are already familiar with React Entities and the concepts of creating and using entities. You can find its documentation [here](https://github.com/arnelenero/react-entities/blob/master/README.md#react-entities).

React Entities Schema extends the React Entities library by enforcing structure to your entities using schema. It uses the PropTypes library to perform the schema-based runtime type checking on entities. You can refer to the PropTypes official documentation [here](https://github.com/facebook/prop-types/blob/master/README.md#prop-types-)

The type checking happens on every call to an entity's `setState()`. If the new state does not conform to the schema, a warning will be logged in the console (but no exception will be thrown). Because it uses PropTypes, **type checking is only performed on non-production builds**. This prevents any performance impact to production builds.

## Creating Structured Entities

When creating a _structured entity_, we use the same format for defining a regular entity but we add a mandatory field called `schema`.

```javascript
  import { T } from 'react-entities-schema';

  export const initialState = {
    value: 0
  };

  export const schema = {
    value: T.number.isRequired
  };

  export const increment = counter => by => {
    counter.setState({ value: counter.state.value + by });
  };

  export const decrement = counter => by => {
    counter.setState({ value: counter.state.value - by });
  };
```

### Defining the schema

The format for defining the schema is exactly the same as defining a component's `PropTypes`, except that you need to use the wrapper called `T` from React Entities Schema. **Do not use `PropTypes` directly for defining schema.**

Note that unlike a React component's PropTypes, the top-level structure of the schema is _strict_, i.e. any prop key that is not defined in the schema will fail the type checking. For example, if the schema is:
```javascript
  export const schema = {
    value: T.number.isRequired
  };
```
then `setState({ wasReset: true })` will fail type checking because `wasReset` is not defined in the schema.

### Automatically generating the initial state

Because the state of the structured entity has to strictly conform to the schema at all times, a valid initial state value is automatically generated, based on the schema, if an `initialState` value is not found in the entity definition.

Schema props that are not indicated as `isRequired` will always get an initial value of `null`, while those with `isRequired` will follow this initial-value table of common prop types:

| Type | Default Value |
| --- | --- |
| `T.string.isRequired` | `'' `|
| `T.number.isRequired` | `0` |
| `T.bool.isRequired` | `false` |
| `T.array.isRequired` | `[]` |
| `T.object.isRequired` | `{}` |
| `T.func.isRequired` | `() => {}` |
| `T.instanceOf(C).isRequired` | `new C()` |
| `T.oneOf([1, 2, 3]).isRequired` | `1` |
| `T.oneOfType([T.number, T.string]).isRequired` | `0` |
| `T.any.isRequired` | `'' `|

Both `T.shape().isRequired` and `T.strict().isRequired` will get an initial value of an object with its props getting default values based on the table above.

### Naming the entity (optional)

A `name` value can be included in the structured entity definition. This is purely optional as it is only used to identify the entity on console warnings.

This is a typical structured entity format, with the optional name and implicit initial state:

**entities/counter.js**
```javascript
  import { T } from 'react-entities-schema';

  export const name = 'counter';

  export const schema = {
    value: T.number.isRequired
  };

  export const increment = counter => by => {
    counter.setState({ value: counter.state.value + by });
  };

  export const decrement = counter => by => {
    counter.setState({ value: counter.state.value - by });
  };
```

## Creating Structured Entity Hooks

For structured entities we need to use `makeEntityWithSchema` instead of the usual  `makeEntity` function.

**entities/index.js**
```javascript
import { makeEntityWithSchema } from 'react-entities-schema';
import * as counter from './counter';

export const useCounter = makeEntityWithSchema(counter);
```

This also supports all features of `makeEntity` including dependency injection, as detailed in the React Entities documentation.

## Using Structured Entity Hooks in Components

A structured entity hook is used and behaves in the same way as a regular entity hook. All recipes in the React Entities documentation also apply to structured entities.
