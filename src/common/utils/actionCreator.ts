import { Action } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

export const actionCreator = actionCreatorFactory();

export interface IActionTypeCreator<T> extends Action<string> {
  type: string;
  payload: T;
}
