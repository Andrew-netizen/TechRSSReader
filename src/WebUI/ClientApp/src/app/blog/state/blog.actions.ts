import {
  BlogDetailsDto,
  BlogDto,
  RssFeedItemDetailsDto,
  FeedItemsViewModel,
  RssFeedItemDto,
  UpdateFeedItemCommand,
  UserTagDto,
  UserTagsViewModel,
  WeeklyBlogSummaryViewModel,
  FeedItemUserTagDto,
} from "../../TechRSSReader-api";

/* NgRx */
import { Action } from "@ngrx/store";

export enum BlogActionTypes {
  ClearBlogs = "[Sidebar GUI] Clear Blogs",
  ClearCurrentBlog = "[Blog GUI] Clear Current Blog",
  ClearCurrentFeedItem = "[Shared GUI] Clear Current Feed Item",
  CreateBlog = "[Blog GUI] Create Blog",
  CreateBlogFail = "[Blog API] Create Blog Fail",
  CreateBlogSuccess = "[Blog API] Create Blog Success",
  CreateUserTag = "[Sidebar GUI] Create User Tag",
  CreateUserTagFail = "[Blog API] Create User Tag Fail",
  CreateUserTagSuccess = "[Blog API] Create User Tag Success",
  CreateFeedItemUserTag = "[Articles API] Create Feed Item User Tag",
  CreateFeedItemUserTagFail = "[Blog API] Create Feed Item User Tag Fail",
  CreateFeedItemUserTagSuccess = "[Blog API] Create Feed Item User Tag Success",
  DeleteBlog = "[Blog GUI] Delete Blog",
  DeleteBlogFail = "[Blog API] Delete Blog Fail",
  DeleteBlogSuccess = "[Blog API] Delete Blog Success",
  InitializeCurrentBlog = "[Blog GUI] Initialize Current Blog",
  LoadAllBlogSummaries = "[Dashboard GUI] Load All Blog Weekly Summaries",
  LoadAllBlogSummariesFail = "[Blog API] Load All Blog Weekly Summaries Fail",
  LoadAllBlogSummariesSuccess = "[Blog API] Load All Blog Weekly Summaries Success",
  LoadBlogs = "[Blog GUI] Load Blogs",
  LoadBlogsSuccess = "[Blog API] Load Blogs Success",
  LoadBlogsFail = "[Blog API] Load Blogs Fail",
  LoadBlogWithItems = "[Articles GUI] Load Blog with Feed Items",
  LoadBlogWithItemsFail = "[Blog API] Load Blog with Feed Items Fail",
  LoadBlogWithItemsSuccess = "[Blog API] Load Blog with Feed Items Success",
  LoadBookmarkedFeedItems = "[Articles GUI] Load Bookmarked Feed Items",
  LoadBookmarkedFeedItemsFail = "[Blog API] Load Bookmarked Feed Items Fail",
  LoadBookmarkedFeedItemsSuccess = "[Blog API] Load Bookmarked Feed Items Success",
  LoadFeedItemDetails = "[Article GUI] Load Feed Item Details",
  LoadFeedItemDetailsFail = "[Blog GUI] Load Feed Item Details Fail",
  LoadFeedItemDetailsSuccess = "[Blog GUI] Load Feed Item Details Success",
  LoadTopRatedFeedItems = "[Articles GUI] Load Top Rated Feed Items",
  LoadTopRatedFeedItemsFail = "[Blog API] Load Top Rated Feed Items Fail",
  LoadTopRatedFeedItemsSuccess = "[Blog API] Load Top Rated Feed Items Success",
  LoadUnreadFeedItems = "[Articles GUI] Load Unread Feed Items",
  LoadUnreadFeedItemsFail = "[Blog API] Load Unread Feed Items Fail",
  LoadUnreadFeedItemsSuccess = "[Blog API] Load Unread Feed Items Success",
  LoadUserTagFeedItems = "[Articles GUI] Load User Tag Feed Items",
  LoadUserTagFeedItemsFail = "[Blog API] Load User Tag Feed Items Fail",
  LoadUserTagFeedItemsSuccess = "[Blog API] Load User Tag Feed Items Success",
  LoadUserTags = "[Articles GUI] Load User Tags",
  LoadUserTagsFail = "[Blog API] Load User Tags Fail",
  LoadUserTagsSuccess = "[Blog API] Load User Tags Success",
  LoadWeeklyBlogSummaries = "[Dashboard GUI] Load Weekly Blog Summaries",
  LoadWeeklyBlogSummariesFail = "[Blog API] Load Weekly Blog Summaries Fail",
  LoadWeeklyBlogSummariesSuccess = "[Blog API] Load Weekly Blog Summaries Success",
  MarkItemAsRead = "[Articles GUI] Mark Item As Read",
  MarkItemAsReadFail = "[Blog API] Mark Item As Read Fail",
  MarkItemAsReadSuccess = "[Blog API] Mark Item As Read Success",
  SetCurrentBlog = "[Blog GUI] Set Current Blog",
  SetCurrentBlogId = "[Sidebar GUI] Set Current Blog Id",
  SetCurrentFeedItemPage = "[Articles GUI] Set Current Feed Item Page",
  SetSidebarMenuCollapsed = "[Sidebar GUI] Set Sidebar Menu collapsed",
  RetrieveFeedItemsFromSource = "[Blog GUI] Retrieve Feed Items",
  RetrieveFeedItemsFromSourceSuccess = "[Blog API] Retrieve Feed Items Success",
  RetrieveFeedItemsFromSourceFail = "[Blog API] Retrieve Feed Items Fail",
  ToggleFeedItemBookmark = "[Articles GUI] Toggle Feed Item Bookmark",
  ToggleFeedItemBookmarkFail = "[Blog API] Toggle Feed Item Bookmark Fail",
  ToggleFeedItemBookmarkSuccess = "[Blog API] Toggle Feed Item Bookmark Success",
  UpdateBlog = "[Blog GUI] Update Blog",
  UpdateBlogSuccess = "[Blog API] Update Blog Success",
  UpdateBlogFail = "[Blog API] Update Blog Fail",
  UpdateUserInterest = "[Articles GUI] Update User Interest",
  UpdateUserInterestFail = "[RSSFeedItem API] Update User Interest Fail",
  UpdateUserInterestSuccess = "[RSSFeedItem API] Update User Interest Success",
}

export class ClearBlogs implements Action {
  readonly type = BlogActionTypes.ClearBlogs;
}

export class ClearCurrentBlog implements Action {
  readonly type = BlogActionTypes.ClearCurrentBlog;
}

export class ClearCurrentFeedItem implements Action {
  readonly type = BlogActionTypes.ClearCurrentFeedItem;
}

export class CreateBlog implements Action {
  readonly type = BlogActionTypes.CreateBlog;
  constructor(public payload: BlogDto) {}
}

export class CreateBlogFail implements Action {
  readonly type = BlogActionTypes.CreateBlogFail;
  constructor(public payload: string) {}
}

export class CreateBlogSuccess implements Action {
  readonly type = BlogActionTypes.CreateBlogSuccess;
  constructor(public payload: BlogDto) {}
}

export class CreateFeedItemUserTag implements Action {
  readonly type = BlogActionTypes.CreateFeedItemUserTag;
  constructor(public payload: FeedItemUserTagDto) {}
}

export class CreateFeedItemUserTagFail implements Action {
  readonly type = BlogActionTypes.CreateFeedItemUserTagFail;
  constructor(public payload: string) {}
}

export class CreateFeedItemUserTagSuccess implements Action {
  readonly type = BlogActionTypes.CreateFeedItemUserTagSuccess;
  constructor(public payload: FeedItemUserTagDto) {}
}


export class CreateUserTag implements Action {
  readonly type = BlogActionTypes.CreateUserTag;
  constructor(public payload: UserTagDto) {}
}

export class CreateUserTagFail implements Action {
  readonly type = BlogActionTypes.CreateUserTagFail;
  constructor(public payload: string) {}
}

export class CreateUserTagSuccess implements Action {
  readonly type = BlogActionTypes.CreateUserTagSuccess;
  constructor(public payload: UserTagDto) {}
}

export class DeleteBlog implements Action {
  readonly type = BlogActionTypes.DeleteBlog;
  constructor(public payload: number) {}
}

export class DeleteBlogFail implements Action {
  readonly type = BlogActionTypes.DeleteBlogFail;
  constructor(public payload: string) {}
}

export class DeleteBlogSuccess implements Action {
  readonly type = BlogActionTypes.DeleteBlogSuccess;
  constructor(public payload: number) {}
}

export class InitializeCurrentBlog implements Action {
  readonly type = BlogActionTypes.InitializeCurrentBlog;
}

export class LoadAllBlogSummaries implements Action {
  readonly type = BlogActionTypes.LoadAllBlogSummaries;
}

export class LoadAllBlogSummariesFail implements Action {
  readonly type = BlogActionTypes.LoadAllBlogSummariesFail;
  constructor(public payload: string) {}
}

export class LoadAllBlogSummariesSuccess implements Action {
  readonly type = BlogActionTypes.LoadAllBlogSummariesSuccess;
  constructor(public payload: WeeklyBlogSummaryViewModel) {}
}

export class LoadBlogs implements Action {
  readonly type = BlogActionTypes.LoadBlogs;
}

export class LoadBlogsFail implements Action {
  readonly type = BlogActionTypes.LoadBlogsFail;
  constructor(public payload: string) {}
}

export class LoadBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LoadBlogsSuccess;
  constructor(public payload: BlogDto[]) {}
}

export class LoadBlogWithItems implements Action {
  readonly type = BlogActionTypes.LoadBlogWithItems;
  constructor(public payload: number) {}
}

export class LoadBlogWithItemsFail implements Action {
  readonly type = BlogActionTypes.LoadBlogWithItemsFail;
  constructor(public payload: string) {}
}

export class LoadBlogWithItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadBlogWithItemsSuccess;
  constructor(public payload: BlogDetailsDto) {}
}

export class LoadBookmarkedFeedItems implements Action {
  readonly type = BlogActionTypes.LoadBookmarkedFeedItems;
}

export class LoadBookmarkedFeedItemsFail implements Action {
  readonly type = BlogActionTypes.LoadBookmarkedFeedItemsFail;
  constructor(public payload: string) {}
}

export class LoadBookmarkedFeedItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadBookmarkedFeedItemsSuccess;
  constructor(public payload: FeedItemsViewModel) {}
}

export class LoadTopRatedFeedItems implements Action {
  readonly type = BlogActionTypes.LoadTopRatedFeedItems;
}

export class LoadTopRatedFeedItemsFail implements Action {
  readonly type = BlogActionTypes.LoadTopRatedFeedItemsFail;
  constructor(public payload: string) {}
}

export class LoadTopRatedFeedItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadTopRatedFeedItemsSuccess;
  constructor(public payload: FeedItemsViewModel) {}
}

export class LoadUnreadFeedItems implements Action {
  readonly type = BlogActionTypes.LoadUnreadFeedItems;
}

export class LoadUnreadFeedItemsFail implements Action {
  readonly type = BlogActionTypes.LoadUnreadFeedItemsFail;
  constructor(public payload: string) {}
}

export class LoadUnreadFeedItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadUnreadFeedItemsSuccess;
  constructor(public payload: FeedItemsViewModel) {}
}

export class LoadUserTags implements Action {
  readonly type = BlogActionTypes.LoadUserTags;
}

export class LoadUserTagsFail implements Action {
  readonly type = BlogActionTypes.LoadUserTagsFail;
  constructor(public payload: string) {}
}

export class LoadUserTagsSuccess implements Action {
  readonly type = BlogActionTypes.LoadUserTagsSuccess;
  constructor(public payload: UserTagsViewModel) {}
}

export class LoadUserTagFeedItems implements Action {
  readonly type = BlogActionTypes.LoadUserTagFeedItems;
  constructor(public payload: number) {}
}

export class LoadUserTagFeedItemsFail implements Action {
  readonly type = BlogActionTypes.LoadUserTagFeedItemsFail;
  constructor(public payload: string) {}
}

export class LoadUserTagFeedItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadUserTagFeedItemsSuccess;
  constructor(public payload: FeedItemsViewModel) {}
}

export class LoadWeeklyBlogSummaries implements Action {
  readonly type = BlogActionTypes.LoadWeeklyBlogSummaries;
  constructor(public payload: number) {}
}

export class LoadWeeklyBlogSummariesFail implements Action {
  readonly type = BlogActionTypes.LoadWeeklyBlogSummariesFail;
  constructor(public payload: string) {}
}

export class LoadWeeklyBlogSummariesSuccess implements Action {
  readonly type = BlogActionTypes.LoadWeeklyBlogSummariesSuccess;
  constructor(public payload: WeeklyBlogSummaryViewModel) {}
}

export class MarkItemAsRead implements Action {
  readonly type = BlogActionTypes.MarkItemAsRead;
  constructor(public payload: UpdateFeedItemCommand) {}
}

export class MarkItemAsReadFail implements Action {
  readonly type = BlogActionTypes.MarkItemAsReadFail;
  constructor(public payload: string) {}
}

export class MarkItemAsReadSuccess implements Action {
  readonly type = BlogActionTypes.MarkItemAsReadSuccess;
  constructor(public payload: RssFeedItemDto) {}
}

export class RetrieveFeedItemsFromSource implements Action {
  readonly type = BlogActionTypes.RetrieveFeedItemsFromSource;
  constructor(public payload: number) {}
}

export class RetrieveFeedItemsFromSourceSuccess implements Action {
  readonly type = BlogActionTypes.RetrieveFeedItemsFromSourceSuccess;
  constructor(public payload: number) {}
}

export class RetrieveFeedItemsFromSourceFail implements Action {
  readonly type = BlogActionTypes.RetrieveFeedItemsFromSourceFail;
  constructor(public payload: string) {}
}

export class SetCurrentBlog implements Action {
  readonly type = BlogActionTypes.SetCurrentBlog;

  constructor(public payload: BlogDto) {}
}

export class SetCurrentBlogId implements Action {
  readonly type = BlogActionTypes.SetCurrentBlogId;

  constructor(public payload: number) {}
}

export class LoadFeedItemDetails implements Action {
  readonly type = BlogActionTypes.LoadFeedItemDetails;
  constructor(public payload: number) {}
}

export class LoadFeedItemDetailsFail implements Action {
  readonly type = BlogActionTypes.LoadFeedItemDetailsFail;
  constructor(public payload: string) {}
}

export class LoadFeedItemDetailsSuccess implements Action {
  readonly type = BlogActionTypes.LoadFeedItemDetailsSuccess;
  constructor(public payload: RssFeedItemDetailsDto) {}
}


export class SetCurrentFeedItemPage implements Action {
  readonly type = BlogActionTypes.SetCurrentFeedItemPage;
  constructor(public payload: number) {}
}

export class SetSidebarMenuCollapsed implements Action {
  readonly type = BlogActionTypes.SetSidebarMenuCollapsed;
  constructor(public payload: boolean) {}
}

export class ToggleFeedItemBookmark implements Action {
  readonly type = BlogActionTypes.ToggleFeedItemBookmark;
  constructor(public payload: UpdateFeedItemCommand) {}
}

export class ToggleFeedItemBookmarkFail implements Action {
  readonly type = BlogActionTypes.ToggleFeedItemBookmarkFail;
  constructor(public payload: string) {}
}

export class ToggleFeedItemBookmarkSuccess implements Action {
  readonly type = BlogActionTypes.ToggleFeedItemBookmarkSuccess;
  constructor(public payload: RssFeedItemDto) {}
}

export class UpdateBlog implements Action {
  readonly type = BlogActionTypes.UpdateBlog;
  constructor(public payload: BlogDto) {}
}

export class UpdateBlogSuccess implements Action {
  readonly type = BlogActionTypes.UpdateBlogSuccess;
  constructor(public payload: BlogDto) {}
}

export class UpdateBlogFail implements Action {
  readonly type = BlogActionTypes.UpdateBlogFail;
  constructor(public payload: string) {}
}

export class UpdateUserInterest implements Action {
  readonly type = BlogActionTypes.UpdateUserInterest;
  constructor(public payload: UpdateFeedItemCommand) {}
}

export class UpdateUserInterestFail implements Action {
  readonly type = BlogActionTypes.UpdateUserInterestFail;
  constructor(public payload: string) {}
}

export class UpdateUserInterestSuccess implements Action {
  readonly type = BlogActionTypes.UpdateUserInterestSuccess;
  constructor(public payload: RssFeedItemDto) {}
}

export type BlogActions =
  | ClearBlogs
  | ClearCurrentBlog
  | ClearCurrentFeedItem
  | CreateBlog
  | CreateBlogFail
  | CreateBlogSuccess
  | CreateUserTag
  | CreateUserTagFail
  | CreateUserTagSuccess
  | CreateFeedItemUserTag
  | CreateFeedItemUserTagFail
  | CreateFeedItemUserTagSuccess
  | DeleteBlog
  | DeleteBlogFail
  | DeleteBlogSuccess
  | InitializeCurrentBlog
  | LoadAllBlogSummaries
  | LoadAllBlogSummariesFail
  | LoadAllBlogSummariesSuccess
  | LoadBlogs
  | LoadBlogsFail
  | LoadBlogsSuccess
  | LoadBlogWithItems
  | LoadBlogWithItemsFail
  | LoadBlogWithItemsSuccess
  | LoadBookmarkedFeedItems
  | LoadBookmarkedFeedItemsFail
  | LoadBookmarkedFeedItemsSuccess
  | LoadTopRatedFeedItems
  | LoadTopRatedFeedItemsFail
  | LoadTopRatedFeedItemsSuccess
  | LoadUnreadFeedItems
  | LoadUnreadFeedItemsFail
  | LoadUnreadFeedItemsSuccess
  | LoadUserTagFeedItems
  | LoadUserTagFeedItemsFail
  | LoadUserTagFeedItemsSuccess
  | LoadUserTags
  | LoadUserTagsFail
  | LoadUserTagsSuccess
  | LoadWeeklyBlogSummaries
  | LoadWeeklyBlogSummariesFail
  | LoadWeeklyBlogSummariesSuccess
  | MarkItemAsRead
  | MarkItemAsReadFail
  | MarkItemAsReadSuccess
  | RetrieveFeedItemsFromSource
  | RetrieveFeedItemsFromSourceFail
  | RetrieveFeedItemsFromSourceSuccess
  | SetCurrentBlog
  | SetCurrentBlogId
  | LoadFeedItemDetails
  | LoadFeedItemDetailsFail
  | LoadFeedItemDetailsSuccess
  | SetCurrentFeedItemPage
  | SetSidebarMenuCollapsed
  | ToggleFeedItemBookmark
  | ToggleFeedItemBookmarkFail
  | ToggleFeedItemBookmarkSuccess
  | UpdateBlog
  | UpdateBlogFail
  | UpdateBlogSuccess
  | UpdateUserInterest
  | UpdateUserInterestFail
  | UpdateUserInterestSuccess;
