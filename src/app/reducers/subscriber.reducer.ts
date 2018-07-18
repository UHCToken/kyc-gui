import { Action } from '@ngrx/store';

export const SET_SUBSCRIBER = 'SET_SUBSCRIBER';
export const CLEAR_SUBSCRIBER = 'CLEAR_SUBSCRIBER';

import {Subscriber} from '../models/subscriber';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface Payload {
  value?: Subscriber;
}

export function subscriberReducer(state: Subscriber = new Subscriber(), action: ActionWithPayload<Payload>) {
  switch (action.type) {
    case SET_SUBSCRIBER:
      return action.payload;
    case CLEAR_SUBSCRIBER:
      return new Subscriber();
    default:
      return state;
  }
}
