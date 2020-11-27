import {
  BlogDto,
  RssFeedItemDto,
  WeeklyBlogSummaryDto,
} from "../../TechRSSReader-api";

/* NgRx */
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogActions, BlogActionTypes } from "./blog.actions";

export enum FeedItemSource {
  Blog,
  Bookmarked,
  Null,
  TopRated,
  Unread,
}

export interface BlogState {
  blogs: BlogDto[];
  currentBlogId: number | null;
  currentFeedItemId: number | null;
  currentFeedItemPage: number;
  error: string;
  feedItemSource: FeedItemSource;
  feedItems: RssFeedItemDto[];
  isLoading: boolean;
  retrievedFeedItemCount: number | null;
  sidebarMenuCollapsed: boolean;
  weeklyBlogSummaries: WeeklyBlogSummaryDto[];
}

const initialState: BlogState = {
  blogs: [],
  currentBlogId: null,
  currentFeedItemId: null,
  currentFeedItemPage: 1,
  error: "",
  feedItemSource: FeedItemSource.Null,
  feedItems: [],
  isLoading: false,
  retrievedFeedItemCount: null,
  sidebarMenuCollapsed: true,
  weeklyBlogSummaries: [],
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

export const getFeedItems = createSelector(getBlogFeatureState, (state) => {
  return state.feedItems;
});

export const getCurrentFeedItemPage = createSelector(
  getBlogFeatureState,
  (state) => state.currentFeedItemPage
);

export const getError = createSelector(
  getBlogFeatureState,
  (state) => state.error
);

export const getFeedItemSource = createSelector(
  getBlogFeatureState,
  (state) => state.feedItemSource
);

export const getFeedItemSectionTitle = createSelector(
  getBlogFeatureState,
  getCurrentBlog,
  (state, blog) => {
    if (state.feedItemSource === FeedItemSource.Unread) return "New";
    if (state.feedItemSource === FeedItemSource.Bookmarked) return "Bookmarks";
    if (state.feedItemSource === FeedItemSource.TopRated) return "Top Rated";
    if (state.feedItemSource === FeedItemSource.Blog && blog) {
      return blog.title;
    }
  }
);

export const getIsLoading = createSelector(
  getBlogFeatureState,
  (state) => state.isLoading
);

export const getRetrievedFeedItemCount = createSelector(
  getBlogFeatureState,
  (state) => state.retrievedFeedItemCount
);

export const getSidebarMenuCollapsed = createSelector(
  getBlogFeatureState,
  (state) => state.sidebarMenuCollapsed
);

export const getCurrentFeedItemId = createSelector(
  getBlogFeatureState,
  (state) => state.currentFeedItemId
);

export const getCurrentFeedItem = createSelector(
  getBlogFeatureState,
  getCurrentFeedItemId,
  (state, currentFeedItemId) => {
    return currentFeedItemId
      ? state.feedItems.find((p) => p.id === currentFeedItemId)
      : null;
  }
);

export const getWeeklyBlogSummaries = createSelector(
  getBlogFeatureState,
  (state) => state.weeklyBlogSummaries
);

export function reducer(state = initialState, action: BlogActions): BlogState {
  switch (action.type) {
    case BlogActionTypes.ClearBlogs:
      return {
        ...state,
        blogs: [],
        currentBlogId: null,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
        feedItemSource: FeedItemSource.Null,
        feedItems: [],
        retrievedFeedItemCount: null,
        isLoading: false,
      };

    case BlogActionTypes.ClearCurrentBlog:
      return {
        ...state,
        currentBlogId: null,
        currentFeedItemId: null,
        retrievedFeedItemCount: null,
        feedItems: [],
      };

    case BlogActionTypes.ClearCurrentFeedItem:
      return {
        ...state,
        currentFeedItemId: null,
      };

    case BlogActionTypes.CreateBlog:
      return {
        ...state,
        isLoading: true,
      };

    case BlogActionTypes.CreateBlogFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.CreateBlogSuccess:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        currentBlogId: action.payload.id,
        retrievedFeedItemCount: null,
        feedItems: [],
        currentFeedItemId: null,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.DeleteBlog:
      return {
        ...state,
        isLoading: true,
      };

    case BlogActionTypes.DeleteBlogFail:
      return {
        ...state,
        error: action.payload,
      };

    case BlogActionTypes.DeleteBlogSuccess:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
        currentBlogId: null,
        retrievedFeedItemCount: null,
        feedItems: [],
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.InitializeCurrentBlog:
      return {
        ...state,
        currentBlogId: 0,
        feedItems: [],
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.LoadAllBlogSummaries:
      return {
        ...state,
        weeklyBlogSummaries: [],
        isLoading: true,
      };

    case BlogActionTypes.LoadAllBlogSummariesFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadAllBlogSummariesSuccess:
      return {
        ...state,
        weeklyBlogSummaries: action.payload.weeklyBlogSummaries,
        isLoading: false,
      };

    case BlogActionTypes.LoadBlogs:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        retrievedFeedItemCount: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadBlogsSuccess:
      return {
        ...state,
        blogs: action.payload,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadBlogsFail:
      return {
        ...state,
        blogs: [],
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadBlogWithItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: action.payload,
        retrievedFeedItemCount: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadBlogWithItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadBlogWithItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Blog,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadBookmarkedFeedItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: null,
        retrievedFeedItemCount: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadBookmarkedFeedItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadBookmarkedFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Bookmarked,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadTopRatedFeedItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: null,
        retrievedFeedItemCount: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadTopRatedFeedItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadTopRatedFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.TopRated,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadUnreadFeedItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: null,
        retrievedFeedItemCount: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadUnreadFeedItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadUnreadFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Unread,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadWeeklyBlogSummaries:
      return {
        ...state,
        weeklyBlogSummaries: [],
        isLoading: true,
      };

    case BlogActionTypes.LoadWeeklyBlogSummariesFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadWeeklyBlogSummariesSuccess:
      return {
        ...state,
        weeklyBlogSummaries: action.payload.weeklyBlogSummaries,
        isLoading: false,
      };

    case BlogActionTypes.MarkItemAsReadFail:
      return {
        ...state,
        error: action.payload,
      };

    case BlogActionTypes.MarkItemAsReadSuccess:
      const updatedFeedItems = state.feedItems.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        feedItems: updatedFeedItems,
        currentFeedItemId: action.payload.id,
        error: "",
      };

    case BlogActionTypes.RetrieveFeedItemsFromSource:
      return {
        ...state,
        retrievedFeedItemCount: null,
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
        feedItems: [],
        currentFeedItemId: null,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.SetCurrentBlogId:
      return {
        ...state,
        currentBlogId: action.payload,
        feedItems: [],
        currentFeedItemId: null,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.SetCurrentFeedItem:
      return {
        ...state,
        currentFeedItemId: action.payload.id,
      };

    case BlogActionTypes.SetCurrentFeedItemPage:
      return {
        ...state,
        currentFeedItemPage: action.payload,
      };

    case BlogActionTypes.SetSidebarMenuCollapsed:
      return {
        ...state,
        sidebarMenuCollapsed: action.payload,
      };

    case BlogActionTypes.ToggleFeedItemBookmarkFail:
      return {
        ...state,
        error: action.payload,
      };

    case BlogActionTypes.ToggleFeedItemBookmarkSuccess:
      const bookmarkUpdatedFeedItems = state.feedItems.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        feedItems: bookmarkUpdatedFeedItems,
        error: "",
      };

    case BlogActionTypes.UpdateBlog:
      return {
        ...state,
        isLoading: true,
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
        isLoading: false,
      };

    case BlogActionTypes.UpdateBlogFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.UpdateUserInterestFail:
      return {
        ...state,
        error: action.payload,
      };

    case BlogActionTypes.UpdateUserInterestSuccess:
      const userInterestUpdatedFeedItems = state.feedItems.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        feedItems: userInterestUpdatedFeedItems,
        error: "",
      };

    default:
      return state;
  }
}
