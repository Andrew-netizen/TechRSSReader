import { ArticlesActionTypes, ArticlesActions } from "./articles.actions";

export enum DisplaySortOrder {
  PublishDateDesc,
  PredictedRating,
}

// State for this feature (Articles)
export interface ArticlesState {
  displaySortOrder: DisplaySortOrder;
  error: string;
  excludeAlreadyRead: boolean;
  keywordExclusion: boolean;
  pageSize: number;
  filterText: string | null;
}

const initialState: ArticlesState = {
  displaySortOrder: DisplaySortOrder.PredictedRating,
  error: "",
  excludeAlreadyRead: true,
  keywordExclusion: true,
  pageSize: 10,
  filterText: null,
};

export function reducer(
  state = initialState,
  action: ArticlesActions
): ArticlesState {
  switch (action.type) {
    case ArticlesActionTypes.SetDisplaySortOrder:
      return {
        ...state,
        displaySortOrder: action.payload,
      };
    case ArticlesActionTypes.SetFilterText:
      return {
        ...state,
        filterText: action.payload,
      };
    case ArticlesActionTypes.ToggleAlreadyRead:
      return {
        ...state,
        excludeAlreadyRead: action.payload,
      };
    case ArticlesActionTypes.ToggleKeywordExclusion:
      return {
        ...state,
        keywordExclusion: action.payload,
      };
    default:
      return state;
  }
}
