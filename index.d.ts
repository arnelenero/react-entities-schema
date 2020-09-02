export type Action = (...args: any[]) => any;

export interface ActionsObject {
  [actions: string]: Action;
}

export type SubscriberFn<S = object> = (state: S) => void;

export type SetStateFn = (updates: object) => void;

export interface EntityOptions<S = object> {
  beforeSetState: (state: S, updates: object) => void;
}

export interface Entity<S = object, F = SubscriberFn> {
  state: S;
  setState: SetStateFn;
  actions: ActionsObject;
  subscribers: F[];
  reset: () => void;
}

export type ActionComposer = (entity: Entity, deps?: any) => Action;

export interface CheckedEntityDefinition<S = object> {
  schema: object;
  name?: string;
  initialState?: S;
  [actions: string]: any;
} 

export type EqualityFn = (a: any, b: any) => boolean;

export type Selector<S = object> = (state: S) => any;

export type EntityHookValue<S, T> = [S, T];

export type EntityHook<S, T> = (selector?: Selector<S>, equalityFn?: EqualityFn) => EntityHookValue<S, T>;

export function makeEntityWithSchema<S = object, T = ActionsObject>(definition: CheckedEntityDefinition<S>, deps?: any): EntityHook<S, T>;
