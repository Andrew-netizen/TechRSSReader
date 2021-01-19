import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { DashboardShellComponent } from "./dashboard-shell.component";

import { getWeeklyBlogSummaries } from "src/app/blog/state/blog.reducer";
import { Component, Input } from "@angular/core";
import { CardData } from "../../card-data";
import { WeeklyBlogSummaryDto } from "src/app/TechRSSReader-api";

describe("DashboardShellComponent", () => {
  let component: DashboardShellComponent;
  let fixture: ComponentFixture<DashboardShellComponent>;
  let store: MockStore;

  @Component({
    selector: 'app-dashboard-blog',
  })
  class MockDashboardBlogComponent {
    @Input() allBlogsCardData: CardData[][];
    @Input() weeklyBlogSummaries: WeeklyBlogSummaryDto[];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardShellComponent, MockDashboardBlogComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [{ selector: getWeeklyBlogSummaries, value: [] }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
