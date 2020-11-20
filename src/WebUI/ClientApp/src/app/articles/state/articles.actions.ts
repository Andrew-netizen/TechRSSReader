/* NgRx */
import { Action } from "@ngrx/store";
import { DisplaySortOrder } from "./articles.reducer";

export enum ArticlesActionTypes {
  SetDisplaySortOrder = "[Articles GUI] Set Display Sort Order",
  SetFilterText = "[Articles GUI] Set Filter Text",
  ToggleAlreadyRead = "[Articles GUI] Toggle Already Read",
  ToggleKeywordExclusion = "[Articles GUI] Toggle Keyword Exclusion",
}

// Action Creators
export class SetDisplaySortOrder implements Action {
  readonly type = ArticlesActionTypes.SetDisplaySortOrder;
  constructor(public payload: DisplaySortOrder) {}
}

export class SetFilterText implements Action {
  readonly type = ArticlesActionTypes.SetFilterText;
  constructor(public payload: string) {}
}

export class ToggleAlreadyRead implements Action {
  readonly type = ArticlesActionTypes.ToggleAlreadyRead;
  constructor(public payload: boolean) {}
}

export class ToggleKeywordExclusion implements Action {
  readonly type = ArticlesActionTypes.ToggleKeywordExclusion;
  constructor(public payload: boolean) {}
}



export type ArticlesActions = SetDisplaySortOrder
| SetFilterText
| ToggleAlreadyRead
| ToggleKeywordExclusion;
