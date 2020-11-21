import { BlogDetailsDto, BlogDto, FeedItemsViewModel, RssFeedItemDto, UpdateFeedItemCommand } from '../../TechRSSReader-api';

/* NgRx */
import { Action } from '@ngrx/store';

export enum BlogActionTypes {
  ClearBlogs = '[Sidebar GUI] Clear Blogs',
  ClearCurrentBlog = '[Blog GUI] Clear Current Blog',
  ClearCurrentFeedItem = '[Shared GUI] Clear Current Feed Item',
  CreateBlog = '[Blog GUI] Create Blog',
  CreateBlogFail = '[Blog API] Create Blog Fail',
  CreateBlogSuccess = '[Blog API] Create Blog Success',
  DeleteBlog = '[Blog GUI] Delete Blog',
  DeleteBlogFail = '[Blog API] Delete Blog Fail',
  DeleteBlogSuccess = '[Blog API] Delete Blog Success',
  InitializeCurrentBlog = '[Blog GUI] Initialize Current Blog',
  LoadBlogs = '[Blog GUI] Load Blogs',
  LoadBlogsSuccess = '[Blog API] Load Blogs Success',
  LoadBlogsFail = '[Blog API] Load Blogs Fail',
  LoadBlogWithItems = '[Articles GUI] Load Blog with Feed Items',
  LoadBlogWithItemsFail = '[Blog API] Load Blog with Feed Items Fail',
  LoadBlogWithItemsSuccess = '[Blog API] Load Blog with Feed Items Success',
  LoadBookmarkedFeedItems = '[Articles GUI] Load Bookmarked Feed Items',
  LoadBookmarkedFeedItemsFail = '[Blog API] Load Bookmarked Feed Items Fail',
  LoadBookmarkedFeedItemsSuccess = '[Blog API] Load Bookmarked Feed Items Success',
  LoadUnreadFeedItems = '[Articles GUI] Load Unread Feed Items',
  LoadUnreadFeedItemsFail = '[Blog API] Load Unread Feed Items Fail',
  LoadUnreadFeedItemsSuccess = '[Blog API] Load Unread Feed Items Success',
  MarkItemAsRead = '[Articles GUI] Mark Item As Read',
  MarkItemAsReadFail = '[Blog API] Mark Item As Read Fail',
  MarkItemAsReadSuccess = '[Blog API] Mark Item As Read Success',
  SetCurrentBlog = '[Blog GUI] Set Current Blog',
  SetCurrentBlogId = '[SideBar GUI] Set Current Blog Id',
  SetCurrentFeedItem = '[Article GUI] Set Current Feed Item',
  SetCurrentFeedItemPage = "[Articles GUI] Set Current Feed Item Page",
  SetSidebarMenuCollapsed = '[Sidebar GUI] Set Sidebar Menu collapsed',
  RetrieveFeedItemsFromSource = '[Blog GUI] Retrieve Feed Items',
  RetrieveFeedItemsFromSourceSuccess = '[Blog API] Retrieve Feed Items Success',
  RetrieveFeedItemsFromSourceFail = '[Blog API] Retrieve Feed Items Fail',
  ToggleFeedItemBookmark = '[Articles GUI] Toggle Feed Item Bookmark',
  ToggleFeedItemBookmarkFail = '[Blog API] Toggle Feed Item Bookmark Fail',
  ToggleFeedItemBookmarkSuccess = '[Blog API] Toggle Feed Item Bookmark Success',
  UpdateBlog = '[Blog GUI] Update Blog',
  UpdateBlogSuccess = '[Blog API] Update Blog Success',
  UpdateBlogFail = '[Blog API] Update Blog Fail',
  UpdateUserInterest = "[Articles GUI] Update User Interest",
  UpdateUserInterestFail = "[RSSFeedItem API] Update User Interest Fail",
  UpdateUserInterestSuccess = "[RSSFeedItem API] Update User Interest Success"
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

export class DeleteBlog implements Action {
  readonly type = BlogActionTypes.DeleteBlog;
  constructor (public payload: number) {}
}

export class DeleteBlogFail implements Action {
  readonly type = BlogActionTypes.DeleteBlogFail;
  constructor(public payload: string) {}
}

export class DeleteBlogSuccess implements Action {
  readonly type = BlogActionTypes.DeleteBlogSuccess;
  constructor (public payload: number) {}
}

export class InitializeCurrentBlog implements Action {
  readonly type = BlogActionTypes.InitializeCurrentBlog;
}

export class LoadBlogs implements Action {
  readonly type = BlogActionTypes.LoadBlogs;
}

export class LoadBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LoadBlogsSuccess;
  constructor(public payload: BlogDto[]) { }
}

export class LoadBlogsFail implements Action {
  readonly type = BlogActionTypes.LoadBlogsFail;
  constructor(public payload: string) { }
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
  readonly type = BlogActionTypes.LoadBookmarkedFeedItemsFail
  constructor(public payload: string) {}
}

export class LoadBookmarkedFeedItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadBookmarkedFeedItemsSuccess
  constructor(public payload: FeedItemsViewModel) {}
}

export class LoadUnreadFeedItems implements Action {
  readonly type = BlogActionTypes.LoadUnreadFeedItems;
}

export class LoadUnreadFeedItemsFail implements Action {
  readonly type = BlogActionTypes.LoadUnreadFeedItemsFail
  constructor(public payload: string) {}
}

export class LoadUnreadFeedItemsSuccess implements Action {
  readonly type = BlogActionTypes.LoadUnreadFeedItemsSuccess
  constructor(public payload: FeedItemsViewModel) {}
}


export class MarkItemAsRead implements Action {
  readonly type = BlogActionTypes.MarkItemAsRead;
  constructor(public payload: UpdateFeedItemCommand) {}
}

export class MarkItemAsReadFail implements Action {
  readonly type = BlogActionTypes.MarkItemAsReadFail;
  constructor (public payload: string) {}
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
  constructor (public payload: string) {}
}

export class SetCurrentBlog implements Action {
  readonly type = BlogActionTypes.SetCurrentBlog;

  constructor(public payload: BlogDto) { }
}

export class SetCurrentBlogId implements Action {
  readonly type = BlogActionTypes.SetCurrentBlogId;

  constructor(public payload: number) { }
}

export class SetCurrentFeedItem implements Action {
  readonly type = BlogActionTypes.SetCurrentFeedItem;
  constructor(public payload: RssFeedItemDto) {}
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
  constructor (public payload: string) {}
}

export class ToggleFeedItemBookmarkSuccess implements Action {
  readonly type = BlogActionTypes.ToggleFeedItemBookmarkSuccess;
  constructor(public payload: RssFeedItemDto) {}
}

export class UpdateBlog implements Action {
  readonly type = BlogActionTypes.UpdateBlog;
  constructor (public payload: BlogDto) {}
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

export type BlogActions = ClearBlogs
| ClearCurrentBlog
| ClearCurrentFeedItem
| CreateBlog
| CreateBlogFail
| CreateBlogSuccess
| DeleteBlog
| DeleteBlogFail
| DeleteBlogSuccess
| InitializeCurrentBlog
| LoadBlogs
| LoadBlogsFail
| LoadBlogsSuccess
| LoadBlogWithItems
| LoadBlogWithItemsFail
| LoadBlogWithItemsSuccess
| LoadBookmarkedFeedItems
| LoadBookmarkedFeedItemsFail
| LoadBookmarkedFeedItemsSuccess
| LoadUnreadFeedItems
| LoadUnreadFeedItemsFail
| LoadUnreadFeedItemsSuccess
| MarkItemAsRead
| MarkItemAsReadFail
| MarkItemAsReadSuccess
| RetrieveFeedItemsFromSource
| RetrieveFeedItemsFromSourceFail
| RetrieveFeedItemsFromSourceSuccess
| SetCurrentBlog
| SetCurrentBlogId
| SetCurrentFeedItem
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

