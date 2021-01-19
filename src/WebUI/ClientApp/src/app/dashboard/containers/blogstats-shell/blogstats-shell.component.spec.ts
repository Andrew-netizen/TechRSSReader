import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";

import { BlogstatsShellComponent } from "./blogstats-shell.component";
import { PublishingDatePipe } from "src/app/shared/publishingdate.pipe";
import { Component, Input } from "@angular/core";
import { CardData } from "../../card-data";
import { BlogDto, WeeklyBlogSummaryDto } from "src/app/TechRSSReader-api";
import {
  getCurrentBlog,
  getWeeklyBlogSummaries,
} from "src/app/blog/state/blog.reducer";

describe("BlogstatsShellComponent", () => {
  let component: BlogstatsShellComponent;
  let fixture: ComponentFixture<BlogstatsShellComponent>;
  let store: MockStore;
  let mockParamMap;
  let fakeBlogSummaryComponent: FakeBlogSummaryComponent;
  @Component({
    selector: "app-blog-summary",
    template: "<div></div>",
  })
  class FakeBlogSummaryComponent {
    @Input() cardDataArray: CardData[];
    @Input() selectedBlog: BlogDto;
    @Input() weeklyBlogSummaries: WeeklyBlogSummaryDto[];
    @Input() lastMonthChartData: Object[];
  }

  beforeEach(async () => {
    mockParamMap = jasmine.createSpyObj(["xxx"]);
    mockParamMap.get = (key: string) => 3;
    TestBed.configureTestingModule({
      declarations: [BlogstatsShellComponent, FakeBlogSummaryComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: getCurrentBlog, value: null },
            { selector: getWeeklyBlogSummaries, value: [] },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(mockParamMap),
          },
        },
        { provide: PublishingDatePipe, useValue: PublishingDatePipe },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogstatsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
