import {BlogDto} from '../../TechRSSReader-api';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogActions, BlogActionTypes } from './blog.actions';

export interface BlogState {
  blogs: BlogDto[];
  currentBlogId: number| null;
  error: string;
}

const initialState: BlogState = {
  blogs: [],
  currentBlogId: null,
  error: ''
}

// Selector functions

const getBlogFeatureState = createFeatureSelector<BlogState>('blogs');

export const getBlogs = createSelector(
  getBlogFeatureState,
  state => state.blogs
);

export const getCurrentBlogId = createSelector(
  getBlogFeatureState,
  state => state.currentBlogId
);

export const getCurrentBlog = createSelector(
  getBlogFeatureState,
  getCurrentBlogId,
  (state, currentBlogId) => {
    if (currentBlogId === 0) {
      return BlogDto.fromJS({
        id: 0,
        title: '',
        xmlAddress: '',
        keywordsToExclude: [],
        keywordsToInclude: []
      });
    } else {
      return currentBlogId ? state.blogs.find(p => p.id === currentBlogId) : null;
    }
  }
);


export const getError = createSelector(
  getBlogFeatureState,
  state => state.error
);

export function reducer(state = initialState, action: BlogActions): BlogState {

  switch (action.type) {

    case BlogActionTypes.ClearCurrentBlog:
      return {
        ...state,
        currentBlogId: null
      };

    case BlogActionTypes.LoadBlogsSuccess:
      return {
        ...state,
        blogs: action.payload,
        error: ''
      };

    case BlogActionTypes.LoadBlogsFail:
      return {
        ...state,
        blogs: [],
        error: action.payload
      };

      case BlogActionTypes.SetCurrentBlog:
        return {
          ...state,
          currentBlogId: action.payload.id
        };
     default:
        return state;
    }

  }
