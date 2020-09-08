import { Injectable } from "@angular/core";

import { BlogService } from "../blog.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as blogActions from "./blog.actions";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError, concatMap } from "rxjs/operators";
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from "@angular/platform-browser-dynamic";
import { BlogDto } from "src/app/techrssreader-api";

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

  @Effect()
  retrieveFeedItemsForFeed$: Observable<Action> = this.actions$.pipe(
    ofType(blogActions.BlogActionTypes.RetrieveFeedItemsFromSource),
    map((action:blogActions.RetrieveFeedItemsFromSource) => action.payload),
    concatMap((blogId: number) =>
      this.blogService.retrieveFeedItems(blogId).pipe(
        map((retrievedItemsCount) => new blogActions.RetrieveFeedItemsFromSourceSuccess(retrievedItemsCount)),
        catchError((error) => of(new blogActions.RetrieveFeedItemsFromSourceFail(error)))
      )
    )
  );

  @Effect()
  updateBlog$: Observable<Action> = this.actions$.pipe(
    ofType(blogActions.BlogActionTypes.UpdateBlog),
    map((action: blogActions.UpdateBlog) => action.payload),
    mergeMap((blog: BlogDto) =>
      this.blogService.updateBlog(blog).pipe(
        map(updatedBlog => (new blogActions.UpdateBlogSuccess(updatedBlog))),
        catchError(error => of (new blogActions.UpdateBlogFail(error)))
      )
    )
  );
}
