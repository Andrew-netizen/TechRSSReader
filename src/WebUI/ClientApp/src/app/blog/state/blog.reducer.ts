import { BlogDto } from "../../TechRSSReader-api";

/* NgRx */
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogActions, BlogActionTypes } from "./blog.actions";

export interface BlogState {
  blogs: BlogDto[];
  currentBlogId: number | null;
  error: string;
  retrievedFeedItemCount: number | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlogId: null,
  error: "",
  retrievedFeedItemCount: null,
};

// Selector functions

const getBlogFeatureState = createFeatureSelector<BlogState>("blogs");

export const getBlogs = createSelector(
  getBlogFeatureState,
  (state) => state.blogs
);

export const getCurrentBlogId = createSelector(
  getBlogFeatureState,
  (state) => state.currentBlogId
);

export const getCurrentBlog = createSelector(
  getBlogFeatureState,
  getCurrentBlogId,
  (state, currentBlogId) => {
    if (currentBlogId === 0) {
      return BlogDto.fromJS({
        id: 0,
        title: "",
        xmlAddress: "",
        keywordsToExclude: [],
        keywordsToInclude: [],
      });
    } else {
      return currentBlogId
        ? state.blogs.find((p) => p.id === currentBlogId)
        : null;
    }
  }
);

export const getError = createSelector(
  getBlogFeatureState,
  (state) => state.error
);

export const getRetrievedFeedItemCount = createSelector(
  getBlogFeatureState,
  (state) => state.retrievedFeedItemCount
);

export function reducer(state = initialState, action: BlogActions): BlogState {
  switch (action.type) {
    case BlogActionTypes.ClearCurrentBlog:
      return {
        ...state,
        currentBlogId: null,
      };

    case BlogActionTypes.LoadBlogsSuccess:
      return {
        ...state,
        blogs: action.payload,
        error: "",
      };

    case BlogActionTypes.LoadBlogsFail:
      return {
        ...state,
        blogs: [],
        error: action.payload,
      };

    case BlogActionTypes.RetrieveFeedItemsFromSourceSuccess:
      return {
        ...state,
        retrievedFeedItemCount: action.payload,
        error: "",
      };

    case BlogActionTypes.RetrieveFeedItemsFromSourceFail:
      return {
        ...state,
        blogs: [],
        error: action.payload,
      };

    case BlogActionTypes.SetCurrentBlog:
      return {
        ...state,
        currentBlogId: action.payload.id,
      };

    case BlogActionTypes.UpdateBlogSuccess:
      const updatedBlogs = state.blogs.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        blogs: updatedBlogs,
        currentBlogId: action.payload.id,
        error: "",
      };

    case BlogActionTypes.UpdateBlogFail:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
