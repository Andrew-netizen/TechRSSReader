import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-blog-chart",
  templateUrl: "./blog-chart.component.html",
  styleUrls: ["./blog-chart.component.scss"],
})
export class BlogChartComponent implements OnDestroy, OnInit {
  @Input() chartData: Object[];

  constructor(private breakpointObserver: BreakpointObserver) {}

  private breakpointSubscription: Subscription;

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.lineChartView = [400, 400];
          this.legend = false;
        } else {
          this.lineChartView = [600, 300];
          this.legend = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = false;
  xAxisLabel: string = "Date";
  yAxisLabel: string = "";
  timeline: boolean = false;
  cardColor: string = "#17252A";

  lineChartView: any[] = [470, 300];

  colorScheme = {
    domain: ["#2B7A78", "#3AAFA9", "#17252A"],
  };

}
