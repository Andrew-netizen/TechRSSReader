import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../shared/shared.module"

// Other Angular Libraries

import { NgxChartsModule }from '@swimlane/ngx-charts';


import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

import { DashboardBlogComponent } from "./components/dashboard-blog/dashboard-blog.component";
import { DashboardShellComponent } from "./containers/dashboard-shell/dashboard-shell.component";
import { BlogstatsShellComponent } from './containers/blogstats-shell/blogstats-shell.component';
import { BlogCardThisweekComponent } from './components/blog-card-thisweek/blog-card-thisweek.component';
import { BlogSummaryComponent } from './components/blog-summary/blog-summary.component';
import { BlogChartComponent } from './components/blog-chart/blog-chart.component';
import { PublishingDatePipe } from "../shared/publishingdate.pipe";
const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardShellComponent,
    canActivate: [AuthorizeGuard],
  },
  {
    path: "dashboard/:id",
    component: BlogstatsShellComponent,
    canActivate: [AuthorizeGuard],
  }
];


@NgModule({
  declarations: [DashboardBlogComponent, DashboardShellComponent, BlogstatsShellComponent, BlogCardThisweekComponent, BlogSummaryComponent, BlogChartComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    NgxChartsModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
  ],
  providers: [PublishingDatePipe],
  exports: [DashboardShellComponent]
})
export class DashboardModule {}
