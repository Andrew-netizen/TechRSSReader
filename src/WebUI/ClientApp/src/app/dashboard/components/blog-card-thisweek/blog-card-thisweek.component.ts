import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WeeklyBlogSummaryDto } from "src/app/TechRSSReader-api";
import { BlogCardData, CardData } from "../../card-data";

@Component({
  selector: "app-blog-card-thisweek",
  templateUrl: "./blog-card-thisweek.component.html",
  styleUrls: ["./blog-card-thisweek.component.scss"],
})
export class BlogCardThisweekComponent implements OnInit, OnDestroy {
  @Input() latestCardData: CardData[];
  @Input() weeklyBlogSummary: WeeklyBlogSummaryDto;

  private breakpointSubscription: Subscription;

  cardColor: string = "#17252A";
  cardView: any[];

  colorScheme = {
    domain: ["#DEF2F1", "#FEFFFF", "#DEF2F1"],
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) this.cardView = [400, 400];
        else this.cardView = [600, 200];
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

  card
}
