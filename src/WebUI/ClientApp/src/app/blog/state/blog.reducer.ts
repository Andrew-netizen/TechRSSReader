import {
  BlogDto,
  FeedItemUserTagDto,
  IRssFeedItemDetailsDto,
  RssFeedItemDto,
  UserTagDto,
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
  UserTags,
}

export interface BlogState {
  blogs: BlogDto[];
  currentBlogId: number | null;
  currentFeedItem: IRssFeedItemDetailsDto | null;
  currentFeedItemPage: number;
  currentUserTagId: number | null;
  error: string;
  feedItemSource: FeedItemSource;
  feedItems: RssFeedItemDto[];
  feedItemUserTags: FeedItemUserTagDto[];
  isLoading: boolean;
  retrievedFeedItemCount: number | null;
  sidebarMenuCollapsed: boolean;
  userTags: UserTagDto[];
  weeklyBlogSummaries: WeeklyBlogSummaryDto[];
}

const initialState: BlogState = {
  blogs: [],
  currentBlogId: null,
  currentFeedItem: null,
  currentFeedItemPage: 1,
  currentUserTagId: null,
  error: "",
  feedItems: [],
  feedItemSource: FeedItemSource.Null,
  feedItemUserTags: [],
  isLoading: false,
  retrievedFeedItemCount: null,
  sidebarMenuCollapsed: true,
  userTags: [],
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

export const getCurrentUserTagId = createSelector(
  getBlogFeatureState,
  (state) => state.currentUserTagId
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

export const getCurrentUserTag = createSelector(
  getBlogFeatureState,
  getCurrentUserTagId,
  (state, currentUserTagId) => {
    return currentUserTagId
      ? state.userTags.find((ut) => ut.id === currentUserTagId)
      : null;
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
  getCurrentUserTag,
  (state, blog, userTag) => {
    if (state.feedItemSource === FeedItemSource.Unread) return "New";
    if (state.feedItemSource === FeedItemSource.Bookmarked) return "Bookmarks";
    if (state.feedItemSource === FeedItemSource.TopRated) return "Top Rated";
    if (state.feedItemSource === FeedItemSource.Blog && blog) {
      return blog.title;
    }
    if (state.feedItemSource === FeedItemSource.UserTags && userTag) {
      return userTag.text;
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

export const getUserTags = createSelector(
  getBlogFeatureState,
  (state) => state.userTags
);

export const getCurrentFeedItem = createSelector(
  getBlogFeatureState,
  (state) => state.currentFeedItem
);

export const getFeedItemUserTags = createSelector(
  getBlogFeatureState,
  (state) => state.feedItemUserTags
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
        currentFeedItem: null,
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
        currentFeedItem: null,
        retrievedFeedItemCount: null,
        feedItems: [],
      };

    case BlogActionTypes.ClearCurrentFeedItem:
      return {
        ...state,
        currentFeedItem: null,
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
        currentFeedItem: null,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.CreateFeedItemUserTag:
      return {
        ...state,
        isLoading: true,
      };

    case BlogActionTypes.CreateFeedItemUserTagFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.CreateFeedItemUserTagSuccess:
      return {
        ...state,
        error: "",
        isLoading: false,
        feedItemUserTags: [...state.feedItemUserTags, action.payload],
      };

    case BlogActionTypes.CreateUserTag:
      return {
        ...state,
        isLoading: true,
      };

    case BlogActionTypes.CreateUserTagFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.CreateUserTagSuccess:
      return {
        ...state,
        error: "",
        isLoading: false,
        userTags: [...state.userTags, action.payload],
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
        currentFeedItem: null,
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
        currentFeedItem: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadBlogWithItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Blog,
        currentFeedItem: null,
        currentFeedItemPage: 1,
        currentUserTagId: null,
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
        currentFeedItem: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadBookmarkedFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Bookmarked,
        currentFeedItem: null,
        currentFeedItemPage: 1,
        currentUserTagId: null,
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
        currentFeedItem: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadTopRatedFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.TopRated,
        currentFeedItem: null,
        currentFeedItemPage: 1,
        currentUserTagId: null,
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
        currentFeedItem: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadUnreadFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.Unread,
        currentFeedItem: null,
        currentFeedItemPage: 1,
        currentUserTagId: null,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadUserTagFeedItems:
      return {
        ...state,
        feedItems: [],
        currentBlogId: null,
        retrievedFeedItemCount: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadUserTagFeedItemsFail:
      return {
        ...state,
        feedItems: [],
        currentFeedItem: null,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadUserTagFeedItemsSuccess:
      return {
        ...state,
        feedItems: action.payload.rssFeedItems,
        feedItemSource: FeedItemSource.UserTags,
        currentFeedItem: null,
        currentFeedItemPage: 1,
        currentUserTagId: action.payload.userTagId,
        error: "",
        isLoading: false,
      };

    case BlogActionTypes.LoadUserTags:
      return {
        ...state,
        userTags: [],
        isLoading: true,
      };

    case BlogActionTypes.LoadUserTagsFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BlogActionTypes.LoadUserTagsSuccess:
      return {
        ...state,
        userTags: action.payload.userTags,
        currentUserTagId: null,
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
        currentBlogId: action.payload.weeklyBlogSummaries.length > 0 ? action.payload.weeklyBlogSummaries[0].blogId : state.currentBlogId,
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
      let updatedFeedItemDetails: IRssFeedItemDetailsDto;
      updatedFeedItemDetails = { ...state.currentFeedItem };
      updatedFeedItemDetails.readAlready = action.payload.readAlready;
      return {
        ...state,
        feedItems: updatedFeedItems,
        currentFeedItem: updatedFeedItemDetails,
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
        currentFeedItem: null,
        currentUserTagId: null,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.SetCurrentBlogId:
      return {
        ...state,
        currentBlogId: action.payload,
        feedItems: [],
        currentFeedItem: null,
        currentUserTagId: null,
        retrievedFeedItemCount: null,
      };

    case BlogActionTypes.LoadFeedItemDetails:
      return {
        ...state,
        currentFeedItem: null,
        isLoading: true,
      };

    case BlogActionTypes.LoadFeedItemDetailsFail:
      return {
        ...state,
        currentFeedItem: null,
        error: action.payload,
        isLoading: false,
      };

    // Don't allow the code to access the feed Items from the current Feed Item. Nested state gets messy.
    // Store it in the feedItemUserTags collection instead.
    case BlogActionTypes.LoadFeedItemDetailsSuccess:
      var newFeedItem: IRssFeedItemDetailsDto = { ...action.payload };
      newFeedItem.feedItemUserTags = [];
      return {
        ...state,
        currentFeedItem: newFeedItem,
        feedItemUserTags: action.payload.feedItemUserTags,
        error: "",
        isLoading: false,
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
      let updatedCurrentFeedItemDetails = { ...state.currentFeedItem };
      updatedCurrentFeedItemDetails.userRating = action.payload.userRating;
      return {
        ...state,
        feedItems: userInterestUpdatedFeedItems,
        currentFeedItem: updatedCurrentFeedItemDetails,
        error: "",
      };

    default:
      return state;
  }
}
