import { Action } from '@ngrx/store';

export const SET_BLUE = 'blue';
export const SET_GREY = 'grey';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface Payload {
  value?: string;
}

export function footerColorReducer(state: string = 'grey', action: ActionWithPayload<Payload>) {
  switch (action.type) {
    case 'SET_BLUE':
      return state = SET_BLUE;
    case 'SET_GREY':
      return state = SET_GREY;
    default:
      return state;
  }
}
