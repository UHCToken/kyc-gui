import { Action } from '@ngrx/store';

export const SET_VALIDATE_TOKEN = 'SET_VALIDATE_TOKEN';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface Payload {
  value?: boolean;
}

export function validateTokenReducer(state: boolean = false, action: ActionWithPayload<Payload>) {
  switch (action.type) {
    case SET_VALIDATE_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
