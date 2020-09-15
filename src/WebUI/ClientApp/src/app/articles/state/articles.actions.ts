/* NgRx */
import { Action } from '@ngrx/store';

export enum ArticlesActionTypes {
  ToggleAlreadyRead = '[Articles GUI] Toggle Already Read',
  ToggleKeywordExclusion = '[Articles GUI] Toggle Keyword Exclusion'
}

// Action Creators

export class ToggleAlreadyRead implements Action {
  readonly type = ArticlesActionTypes.ToggleAlreadyRead;
  constructor(public payload: boolean) { }
}

export class ToggleKeywordExclusion implements Action {
  readonly type = ArticlesActionTypes.ToggleKeywordExclusion;
  constructor(public payload: boolean) { }
}

export type ArticlesActions = ToggleAlreadyRead
| ToggleKeywordExclusion;
