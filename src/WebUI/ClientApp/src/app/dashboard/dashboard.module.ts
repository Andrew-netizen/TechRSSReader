import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Other Angular Libraries

import { NgxChartsModule }from '@swimlane/ngx-charts';


import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

import { DashboardBlogComponent } from "./components/dashboard-blog/dashboard-blog.component";
import { DashboardShellComponent } from "./containers/dashboard-shell/dashboard-shell.component";
import { BlogstatsShellComponent } from './containers/blogstats-shell/blogstats-shell.component';

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
  declarations: [DashboardBlogComponent, DashboardShellComponent, BlogstatsShellComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    NgxChartsModule,
    RouterModule.forChild(dashboardRoutes),
  ],
})
export class DashboardModule {}
