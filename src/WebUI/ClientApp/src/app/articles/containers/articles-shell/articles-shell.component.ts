import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, ParamMap, UrlSegment } from "@angular/router";

import {
  BlogDto,
  FeedItemUserTagDto,
  IRssFeedItemDetailsDto,
  RssFeedItemDto,
  UpdateFeedItemCommand,
  UserTagDto,
} from "src/app/TechRSSReader-api";
import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";
import * as fromArticles from "../../state";
import * as blogActions from "../../../blog/state/blog.actions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddItemtagModalComponent } from "../../components/add-itemtag-modal/add-itemtag-modal.component";

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
  feedItemUserTags$: Observable<FeedItemUserTagDto[]>;
  filterText$: Observable<string>;
  pagesCount$: Observable<number>;
  selectedBlog$: Observable<BlogDto>;
  selectedFeedItem$: Observable<IRssFeedItemDetailsDto>;
  showBlogTitle$: Observable<boolean>;
  totalArticleCount$: Observable<number>;
  userTags$: Observable<UserTagDto[]>;

  feedItemSubscription: Subscription;
  userTagsSubscription: Subscription;
  routeUrlSubscription: Subscription;

  userTags: UserTagDto[];
  currentFeedItem: RssFeedItemDto;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.routeUrlSubscription = this.route.url.subscribe(
      (value: UrlSegment[]) => {
        if (value.length != 2) return;
        if (value[0].toString() === "articles") {
          if (value[1].toString() === "new") this.unreadMenuSelected();
          if (value[1].toString() === "bookmarked")
            this.bookmarksMenuSelected();
          if (value[1].toString() === "toprated") this.topRatedMenuSelected();
          if (!isNaN(Number(value[1].toString()))) {
            this.blogMenuItemSelected(Number(value[1].toString()));
          }
        }
        if (value[0].toString() === "usertags") {
          if (!isNaN(Number(value[1].toString()))) {
            this.userTagMenuItemSelected(Number(value[1].toString()));
          }
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

    this.feedItemUserTags$ = this.store.pipe(
      select(fromBlog.getFeedItemUserTags)
    );

    this.filterText$ = this.store.pipe(select(fromArticles.getFilterText));

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

    this.userTags$ = this.store.pipe(select(fromBlog.getUserTags));

    this.feedItemSubscription = this.store
      .pipe(select(fromBlog.getCurrentFeedItem))
      .subscribe((value: RssFeedItemDto) => (this.currentFeedItem = value));

    this.userTagsSubscription = this.userTags$.subscribe(
      (value: UserTagDto[]) => (this.userTags = value)
    );
  }

  ngOnDestroy(): void {
    this.feedItemSubscription.unsubscribe();
    this.routeUrlSubscription.unsubscribe();
    this.userTagsSubscription.unsubscribe();
  }

  addItemTagClicked(feedItem: RssFeedItemDto) {
    const modalRef = this.modalService.open(AddItemtagModalComponent);
    modalRef.result.then((value) => {
      this.store.dispatch(
        new blogActions.CreateFeedItemUserTag(FeedItemUserTagDto.fromJS(value))
      );
    });
    modalRef.componentInstance.userTags = this.userTags;
    modalRef.componentInstance.feedItem = this.currentFeedItem;
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

  topRatedMenuSelected(): void {
    this.store.dispatch(new blogActions.LoadTopRatedFeedItems());
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
    this.store.dispatch(new blogActions.LoadFeedItemDetails(feedItem.id));
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

  onFeedItemUserTagDeleted(value: FeedItemUserTagDto): void {
    this.store.dispatch(new blogActions.DeleteFeedItemUserTag(value));
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
  userTagMenuItemSelected(userTagId: number): void {
    this.store.dispatch(new blogActions.LoadUserTagFeedItems(userTagId));
  }
}
