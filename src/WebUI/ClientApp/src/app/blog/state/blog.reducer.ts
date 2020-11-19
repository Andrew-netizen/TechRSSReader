import { BlogDto, RssFeedItemDto } from "../../TechRSSReader-api";

/* NgRx */
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogActions, BlogActionTypes } from "./blog.actions";

export enum FeedItemSource {
  Blog,
  Bookmarked,
  Null,
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
  retrievedFeedItemCount: number | null;
  sidebarMenuCollapsed: boolean;
}

const initialState: BlogState = {
  blogs: [],
  currentBlogId: null,
  currentFeedItemId: null,
  currentFeedItemPage: 1,
  error: "",
  feedItemSource: FeedItemSource.Null,
  feedItems: [],
  retrievedFeedItemCount: null,
  sidebarMenuCollapsed: true,
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
    if (state.feedItemSource === FeedItemSource.Blog && blog) {
      return blog.title;
    }
  }
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

    case BlogActionTypes.CreateBlogFail:
      return {
        ...state,
        error: action.payload,
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
      };

    case BlogActionTypes.InitializeCurrentBlog:
      return {
        ...state,
        currentBlogId: 0,
        feedItems: [],
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.LoadBlogs:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        retrievedFeedItemCount: null,
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

    case BlogActionTypes.LoadBlogWithItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: action.payload,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.LoadBlogWithItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
      };

    case BlogActionTypes.LoadBlogWithItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Blog,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
      };

    case BlogActionTypes.LoadBookmarkedFeedItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: null,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.LoadBookmarkedFeedItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
      };

    case BlogActionTypes.LoadBookmarkedFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Bookmarked,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
      };

    case BlogActionTypes.LoadUnreadFeedItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: null,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.LoadUnreadFeedItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItemId: null,
        error: action.payload,
      };

    case BlogActionTypes.LoadUnreadFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Unread,
        currentFeedItemId: null,
        currentFeedItemPage: 1,
        error: "",
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
