import { BlogDto } from '../../TechRSSReader-api';

/* NgRx */
import { Action } from '@ngrx/store';

export enum BlogActionTypes {
  ClearCurrentBlog = '[Blog GUI] Clear Current Blog',
  LoadBlogs = '[Blog GUI] Load Blogs',
  LoadBlogsSuccess = '[Blog API] Load Blogs Success',
  LoadBlogsFail = '[Blog API] Load Blogs Fail',
  SetCurrentBlog = '[Blog GUI] Set Current Blog',
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

export class SetCurrentBlog implements Action {
  readonly type = BlogActionTypes.SetCurrentBlog;

  constructor(public payload: BlogDto) { }
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
| LoadBlogs
| LoadBlogsSuccess
| LoadBlogsFail
| RetrieveFeedItemsFromSource
| RetrieveFeedItemsFromSourceFail
| RetrieveFeedItemsFromSourceSuccess
| SetCurrentBlog
| UpdateBlog
| UpdateBlogFail
| UpdateBlogSuccess;

