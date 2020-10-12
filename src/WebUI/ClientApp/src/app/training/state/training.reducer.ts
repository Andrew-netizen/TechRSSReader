import {RssFeedItemDto} from '../../TechRSSReader-api';
import {TrainingActions, TrainingActionTypes} from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  currentFeedItem: RssFeedItemDto;
  error: string;
}

const initialState: TrainingState = {
  currentFeedItem: null,
  error: ""
};

const getTrainingFeatureState = createFeatureSelector<TrainingState>("training");

export const getCurrentFeedItem = createSelector(
  getTrainingFeatureState,
  (state) => state.currentFeedItem
);

export const getError = createSelector(
  getTrainingFeatureState,
  (state) => state.error
);

export function reducer(state = initialState, action: TrainingActions): TrainingState {
  switch (action.type) {
    case TrainingActionTypes.GetTrainingItemFail:
    return {
      ...state,
      error: action.payload
    };
    case TrainingActionTypes.GetTrainingItemSuccess:
    return {
      ...state,
      currentFeedItem: action.payload
    };
    case TrainingActionTypes.ToggleBookmarkFail:
      return {
        ...state,
        error: action.payload
      };

      case TrainingActionTypes.ToggleBookmarkSuccess:
    return {
      ...state,
      currentFeedItem: action.payload
    };

    case TrainingActionTypes.UpdateUserInterestFail:
    return {
      ...state,
      error: action.payload
    };
    case TrainingActionTypes.UpdateUserInterestSuccess:
    return {
      ...state,
      currentFeedItem: null
    };
    default:
      return state;
  }
}
