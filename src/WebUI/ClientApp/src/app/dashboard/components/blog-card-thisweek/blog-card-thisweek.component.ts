import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WeeklyBlogSummaryDto } from "src/app/TechRSSReader-api";
import { CardData } from "../../card-data";

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
    domain: ["#2B7A78", "#FEFFFF", "#DEF2F1"],
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

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

  showStats(blogId: number): void {
    this.router.navigate(["/dashboard/", blogId]);
  }
}
