import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import {
  BlogDto,
  RssFeedItemDto,
  UpdateFeedItemCommand,
} from "src/app/TechRSSReader-api";

import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";
import * as fromArticles from "../../state";
import * as blogActions from "../../../blog/state/blog.actions";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "articles-shell",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./articles-shell.component.html",
  styleUrls: ["./articles-shell.component.scss"],
})
export class ArticlesShellComponent implements OnInit, OnDestroy {
  blogs$: Observable<BlogDto[]>;
  currentPage$: Observable<number>;
  feedItems$: Observable<RssFeedItemDto[]>;
  feedItemSectionTitle$: Observable<string>;
  feedItemSource$: Observable<fromBlog.FeedItemSource>;
  pagesCount$: Observable<number>;
  selectedBlog$: Observable<BlogDto>;
  selectedFeedItem$: Observable<RssFeedItemDto>;
  showBlogTitle$: Observable<boolean>;
  totalArticleCount$: Observable<number>;
  paramMapSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramMapSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.get("id") === "new") this.unreadMenuSelected();
        if (params.get("id") === "bookmarked") this.bookmarksMenuSelected();
        if (!isNaN(Number(params.get("id")))) {
          this.blogMenuItemSelected(Number(params.get("id")));
        }
      }
    );

    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<
      BlogDto[]
    >;
    this.currentPage$ = this.store.pipe(
      select(fromArticles.getCurrentFeedItemPage)
    );

    this.feedItems$ = this.store.pipe(
      select(fromArticles.getPaginatedArticles)
    );

    this.feedItemSectionTitle$ = this.store.pipe(
      select(fromBlog.getFeedItemSectionTitle)
    );

    this.feedItemSource$ = this.store.pipe(select(fromBlog.getFeedItemSource));

    this.pagesCount$ = this.store.pipe(select(fromArticles.getPagesCount));

    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));

    this.selectedFeedItem$ = this.store.pipe(
      select(fromBlog.getCurrentFeedItem)
    );

    this.showBlogTitle$ = this.store.pipe(
      select(fromArticles.getShowBlogTitle)
    );

    this.totalArticleCount$ = this.store.pipe(
      select(fromArticles.getFilteredArticleCount)
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  blogSelected(blog: BlogDto): void {
    this.store.dispatch(new blogActions.LoadBlogWithItems(blog.id));
  }

  blogMenuItemSelected(blogId: number): void {
    this.store.dispatch(new blogActions.LoadBlogWithItems(blogId));
  }

  bookmarksMenuSelected(): void {
    this.store.dispatch(new blogActions.LoadBookmarkedFeedItems());
  }

  unreadMenuSelected(): void {
    this.store.dispatch(new blogActions.LoadUnreadFeedItems());
  }

  currentPageChanged(value: number): void {
    this.store.dispatch(new blogActions.SetCurrentFeedItemPage(value));
  }

  clearCurrentFeedItem(): void {
    this.store.dispatch(new blogActions.ClearCurrentFeedItem());
  }

  feedItemSelected(feedItem: RssFeedItemDto): void {
    this.store.dispatch(new blogActions.SetCurrentFeedItem(feedItem));
  }

  markItemAsAlreadyRead(value: RssFeedItemDto): void {
    const command: UpdateFeedItemCommand = UpdateFeedItemCommand.fromJS({
      id: value.id,
      bookmarked: value.bookmarked,
      readAlready: true,
      userRating: value.userRating,
    });
    this.store.dispatch(new blogActions.MarkItemAsRead(command));
  }

  toggleItemBookmark(value: RssFeedItemDto): void {
    const command: UpdateFeedItemCommand = UpdateFeedItemCommand.fromJS({
      id: value.id,
      bookmarked: !value.bookmarked,
      readAlready: value.readAlready,
      userRating: value.userRating,
    });
    this.store.dispatch(new blogActions.ToggleFeedItemBookmark(command));
  }

  userInterestUpdateHandler(value: UpdateFeedItemCommand): void {
    this.store.dispatch(new blogActions.UpdateUserInterest(value));
  }

}
