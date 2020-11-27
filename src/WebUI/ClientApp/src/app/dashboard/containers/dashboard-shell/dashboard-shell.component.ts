import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { WeeklyBlogSummaryDto } from "src/app/TechRSSReader-api";
import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";
import * as blogActions from "../../../blog/state/blog.actions";
import { BlogCardData, CardData, mapCardData } from "../../card-data";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard-shell",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./dashboard-shell.component.html",
  styleUrls: ["./dashboard-shell.component.scss"],
})
export class DashboardShellComponent implements OnInit {
  weeklyBlogSummaries$: Observable<WeeklyBlogSummaryDto[]>;
  latestCardData$: Observable<CardData[][]>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new blogActions.LoadAllBlogSummaries());

    this.weeklyBlogSummaries$ = this.store.pipe(
      select(fromBlog.getWeeklyBlogSummaries)
    );

    this.latestCardData$ = this.weeklyBlogSummaries$.pipe(
      map((value: WeeklyBlogSummaryDto[]) => {
        return value.map((val: WeeklyBlogSummaryDto) => mapCardData(val).toArray());
      })
    )
  }
}
