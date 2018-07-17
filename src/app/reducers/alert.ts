import { Alert } from '../models/alert';
import {Action} from '@ngrx/store';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface Payload {
  value?: Alert;
}

export function alert (state: Alert = new Alert(), action: ActionWithPayload<Payload>)  {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload;
    case 'CLEAR_ALERT':
      state = new Alert();
      return state;
    default:
      return state;
  }
}
