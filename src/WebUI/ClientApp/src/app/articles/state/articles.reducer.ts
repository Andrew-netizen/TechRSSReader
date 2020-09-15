import {ArticlesActionTypes, ArticlesActions} from './articles.actions';

// State for this feature (Articles)
export interface ArticlesState {
  excludeAlreadyRead: boolean;
  keywordExclusion: boolean,
  error: string;
}

const initialState: ArticlesState = {
  excludeAlreadyRead: true,
  keywordExclusion: true,
  error:  ""
}

export function reducer(state = initialState, action:ArticlesActions): ArticlesState {
  switch (action.type) {
    case ArticlesActionTypes.ToggleAlreadyRead:
    return {
      ...state,
      excludeAlreadyRead: action.payload
    };
    case ArticlesActionTypes.ToggleKeywordExclusion:
    return {
      ...state,
      keywordExclusion: action.payload
    };
    default:
      return state;
  }


}
