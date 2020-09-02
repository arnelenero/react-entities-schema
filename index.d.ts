export interface CheckedEntityDefinition<S = object> {
  schema: object;
  name?: string;
  initialState?: S;
  [actions: string]: any;
} 

export function makeEntityWithSchema<S = object, T = ActionsObject>(definition: CheckedEntityDefinition<S>, deps?: any): EntityHook<S, T>;
