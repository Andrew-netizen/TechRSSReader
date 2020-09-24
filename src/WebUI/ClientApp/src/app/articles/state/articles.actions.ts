/* NgRx */
import { Action } from "@ngrx/store";
import { DisplaySortOrder } from "./articles.reducer";

export enum ArticlesActionTypes {
  SetDisplaySortOrder = "[Articles GUI] Set Display Sort Order",
  ToggleAlreadyRead = "[Articles GUI] Toggle Already Read",
  ToggleKeywordExclusion = "[Articles GUI] Toggle Keyword Exclusion",
}

// Action Creators

export class ToggleAlreadyRead implements Action {
  readonly type = ArticlesActionTypes.ToggleAlreadyRead;
  constructor(public payload: boolean) {}
}

export class ToggleKeywordExclusion implements Action {
  readonly type = ArticlesActionTypes.ToggleKeywordExclusion;
  constructor(public payload: boolean) {}
}

export class SetDisplaySortOrder implements Action {
  readonly type = ArticlesActionTypes.SetDisplaySortOrder;
  constructor(public payload: DisplaySortOrder) {}
}

export type ArticlesActions = SetDisplaySortOrder
| ToggleAlreadyRead
| ToggleKeywordExclusion;
