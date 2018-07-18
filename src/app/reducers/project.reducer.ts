import { Action } from '@ngrx/store';

export const SET_PROJECT = 'SET_PROJECT';
export const CLEAR_PROJECT = 'CLEAR_PROJECT';

import { Project } from '../models/project';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface Payload {
  value?: Project;
}

export function projectReducer(state: Project = new Project(), action: ActionWithPayload<Payload>) {
  switch (action.type) {
    case SET_PROJECT:
      return action.payload;
    case CLEAR_PROJECT:
      return new Project();
    default:
      return state;
  }
}
