import { Action } from '@ngrx/store';

export const IS_LOADING = 'IS_LOADING';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface Payload {
  value?: boolean;
}

export function isLoading(state: boolean = false, action: ActionWithPayload<Payload>) {
  switch (action.type) {
    case IS_LOADING:
      return action.payload;
    default:
      return state;
  }
}
