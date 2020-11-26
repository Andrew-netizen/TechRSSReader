import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { BlogDto, WeeklyBlogSummaryDto } from "src/app/TechRSSReader-api";
import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";
import * as blogActions from "../../../blog/state/blog.actions";
import { map } from "rxjs/operators";
import { CardData } from "../../card-data";

@Component({
  selector: "app-blogstats-shell",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./blogstats-shell.component.html",
  styleUrls: ["./blogstats-shell.component.scss"],
})
export class BlogstatsShellComponent implements OnInit, OnDestroy {
  selectedBlog$: Observable<BlogDto>;
  weeklyBlogSummaries$: Observable<WeeklyBlogSummaryDto[]>;
  latestCardData$: Observable<CardData[] | null>;
  paramMapSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (!isNaN(Number(params.get("id")))) {
          this.store.dispatch(
            new blogActions.LoadWeeklyBlogSummaries(Number(params.get("id")))
          );
        }
      }
    );

    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));
    this.weeklyBlogSummaries$ = this.store.pipe(
      select(fromBlog.getWeeklyBlogSummaries)
    );

    this.latestCardData$ = this.weeklyBlogSummaries$.pipe(
      map((value) => {
        if (value && value.length > 0) return this.mapCardData(value[0]);
        else return null;
      })
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  mapCardData(weeklyBlogSummary: WeeklyBlogSummaryDto): CardData[] {
    const result: CardData[] = [];
    result.push(
      new CardData("New", weeklyBlogSummary.newNotExcluded.toString())
    );
    result.push(
      new CardData("You Read", weeklyBlogSummary.itemsRead.toString())
    );
    result.push(
      new CardData(
        "You Liked",
        weeklyBlogSummary.itemsRatedAtLeastThree.toString()
      )
    );

    return result;
  }
}
