import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  FeedItemSource,
  getBlogs,
  getCurrentFeedItem,
  getCurrentFeedItemPage,
  getFeedItemSectionTitle,
  getFeedItemSource,
  getFeedItemUserTags,
  getUserTags,
} from "src/app/blog/state/blog.reducer";
import { getFilteredArticleCount, getFilterText, getPagesCount, getPaginatedArticles } from "../../state";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ArticlesShellComponent } from "./articles-shell.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { Component, Input } from "@angular/core";
import { BlogDto, FeedItemUserTagDto, RssFeedItemDetailsDto, RssFeedItemDto } from "src/app/TechRSSReader-api";

describe("ArticlesShellComponent", () => {
  let component: ArticlesShellComponent;
  let fixture: ComponentFixture<ArticlesShellComponent>;
  let store: MockStore;

@Component({
  selector: 'articles-list',
})
class MockArticlesListComponent {

  public FeedItemSourceEnum = FeedItemSource;

  @Input() currentPage: number;
  @Input() feedItems: RssFeedItemDto[];
  @Input() feedItemSectionTitle: string;
  @Input() feedItemSource: FeedItemSource;
  @Input() feedItemUserTags: FeedItemUserTagDto[];
  @Input() filterText: string;
  @Input() pageCount: number;
  @Input() selectedBlog: BlogDto;
  @Input() selectedFeedItem: RssFeedItemDetailsDto;
  @Input() showBlogTitle: boolean;
  @Input() totalArticlesCount: number;
}

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesShellComponent, MockArticlesListComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: getBlogs, value: [] },
            { selector: getCurrentFeedItemPage, value: 1 },
            { selector: getPaginatedArticles, value: [] },
            { selector: getFeedItemSectionTitle, value: 'Slashdot'},
            { selector: getFeedItemSource, value: FeedItemSource.Blog},
            {selector: getFeedItemUserTags, value: []},
            {selector: getFilterText, value: ''},
            {selector: getPagesCount, value: 1},
            {selector: getCurrentFeedItem, value: null},
            {selector: getFilteredArticleCount, value: 5},
            {selector: getUserTags, value: []},
          ],
        }),
        {provide: NgbModal, useValue: NgbModal},
        {provide: ActivatedRoute, useValue: {
          url: of([])
        }}
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
