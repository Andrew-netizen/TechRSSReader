import { BlogDto } from '../../TechRSSReader-api';

/* NgRx */
import { Action } from '@ngrx/store';

export enum BlogActionTypes {
  ClearCurrentBlog = '[Blog GUI] Clear Current Blog',
  LoadBlogs = '[Blog GUI] Load Blogs',
  LoadBlogsSuccess = '[Blog API] Load Blogs Success',
  LoadBlogsFail = '[Blog API] Load Blogs Fail',
  SetCurrentBlog = '[Blog GUI] Set Current Blog'
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

export type BlogActions = ClearCurrentBlog
| LoadBlogs
| LoadBlogsSuccess
| LoadBlogsFail
| SetCurrentBlog;
