import { Injectable } from "@angular/core";

import { BlogService } from "../blog.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as blogActions from "./blog.actions";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";

@Injectable()
export class BlogEffects {
  constructor(private blogService: BlogService, private actions$: Actions) {}

  @Effect()
  loadBlogs$: Observable<Action> = this.actions$.pipe(
    ofType(blogActions.BlogActionTypes.LoadBlogs),
    mergeMap((action) =>
      this.blogService.getBlogs().pipe(
        map((blogs) => new blogActions.LoadBlogsSuccess(blogs)),
        catchError((error) => of(new blogActions.LoadBlogsFail(error)))
      )
    )
  );
}
