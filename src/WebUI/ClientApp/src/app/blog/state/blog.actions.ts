import { BlogDto, RssFeedItemDto, UpdateFeedItemCommand } from '../../TechRSSReader-api';

/* NgRx */
import { Action } from '@ngrx/store';

export enum BlogActionTypes {
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
  MarkItemAsRead = '[Articles GUI] Mark Item As Read',
  MarkItemAsReadFail = '[Blog API] Mark Item As Read Fail',
  MarkItemAsReadSuccess = '[Blog API] Mark Item As Read Success',
  SetCurrentBlog = '[Blog GUI] Set Current Blog',
  SetCurrentFeedItem = '[Article GUI] Set Current Feed Item',
  SetCurrentFeedItemPage = "[Articles GUI] Set Current Feed Item Page",
  RetrieveFeedItemsFromSource = '[Blog GUI] Retrieve Feed Items',
  RetrieveFeedItemsFromSourceSuccess = '[Blog API] Retrieve Feed Items Success',
  RetrieveFeedItemsFromSourceFail = '[Blog GUI] Retrieve Feed Items Fail',
  UpdateBlog = '[Blog GUI] Update Blog',
  UpdateBlogSuccess = '[Blog API] Update Blog Success',
  UpdateBlogFail = '[Blog API] Update Blog Fail'
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
  constructor(public payload: BlogDto) {}
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

export class SetCurrentFeedItem implements Action {
  readonly type = BlogActionTypes.SetCurrentFeedItem;
  constructor(public payload: RssFeedItemDto) {}
}

export class SetCurrentFeedItemPage implements Action {
  readonly type = BlogActionTypes.SetCurrentFeedItemPage;
  constructor(public payload: number) {}
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

export type BlogActions = ClearCurrentBlog
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
| MarkItemAsRead
| MarkItemAsReadFail
| MarkItemAsReadSuccess
| RetrieveFeedItemsFromSource
| RetrieveFeedItemsFromSourceFail
| RetrieveFeedItemsFromSourceSuccess
| SetCurrentBlog
| SetCurrentFeedItem
| SetCurrentFeedItemPage
| UpdateBlog
| UpdateBlogFail
| UpdateBlogSuccess;

