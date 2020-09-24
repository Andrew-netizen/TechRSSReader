import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  BlogDto,
  RssFeedItemDto,
  UpdateFeedItemCommand,
} from "src/app/techrssreader-api";

import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";
import * as fromArticles from "../../state";
import * as articlesActions from "../../state/articles.actions";
import * as blogActions from "../../../blog/state/blog.actions";
import { DisplaySortOrder } from "../../state/articles.reducer";

@Component({
  selector: "articles-shell",
  templateUrl: "./articles-shell.component.html",
  styleUrls: ["./articles-shell.component.scss"],
})
export class ArticlesShellComponent implements OnInit {
  selectedBlog$: Observable<BlogDto>;
  blogs$: Observable<BlogDto[]>;
  displaySortOrder$: Observable<DisplaySortOrder>;
  feedItems$: Observable<RssFeedItemDto[]>;
  selectedFeedItem$: Observable<RssFeedItemDto>;
  excludeAlreadyRead$: Observable<boolean>;
  keywordExclusion$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<
      BlogDto[]
    >;
    this.store.dispatch(new blogActions.LoadBlogs());
    this.store.dispatch(new blogActions.ClearCurrentBlog());
    this.displaySortOrder$ = this.store.pipe(
      select(fromArticles.getDisplaySortOrder)
    );
    this.feedItems$ = this.store.pipe(select(fromArticles.getFilteredArticles));
    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));
    this.selectedFeedItem$ = this.store.pipe(
      select(fromBlog.getCurrentFeedItem)
    );
    this.excludeAlreadyRead$ = this.store.pipe(
      select(fromArticles.getExcludeAlreadyRead)
    );
    this.keywordExclusion$ = this.store.pipe(
      select(fromArticles.getKeywordExclusion)
    );
  }

  blogSelected(blog: BlogDto): void {
    console.log("Blog Id is", blog.id);
    this.store.dispatch(new blogActions.LoadBlogWithItems(blog.id));
  }

  clearCurrentFeedItem(): void {
    this.store.dispatch(new blogActions.ClearCurrentFeedItem());
  }

  feedItemSelected(feedItem: RssFeedItemDto): void {
    this.store.dispatch(new blogActions.SetCurrentFeedItem(feedItem));
  }

  excludeAlreadyReadChanged(value: boolean): void {
    this.store.dispatch(new articlesActions.ToggleAlreadyRead(value));
  }

  keywordExclusionChanged(value: boolean): void {
    this.store.dispatch(new articlesActions.ToggleKeywordExclusion(value));
  }

  markItemAsAlreadyRead(value: RssFeedItemDto): void {
    const command: UpdateFeedItemCommand = UpdateFeedItemCommand.fromJS({
      id: value.id,
      userRating: value.userRating,
      readAlready: true,
    });
    this.store.dispatch(new blogActions.MarkItemAsRead(command));
  }

  setDisplaySortOrder(value: DisplaySortOrder): void {
    this.store.dispatch(new articlesActions.SetDisplaySortOrder(value));
  }
}
