import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { FeeditemDisplayComponent } from "./components/feeditem-display/feeditem-display.component";
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { PublishingDatePipe } from "./publishingdate.pipe";
import { StarComponent } from "./components/star/star.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";

import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';

@NgModule({
  declarations: [
    FeeditemDisplayComponent,
    BlogListComponent,
    PublishingDatePipe,
    StarComponent,
    PaginatorComponent,
    SidebarMenuComponent,
    SettingsModalComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, NgbModule, RouterModule],
  exports: [
    BlogListComponent,
    FeeditemDisplayComponent,
    PaginatorComponent,
    PublishingDatePipe,
    StarComponent,
    SidebarMenuComponent,
  ],
})
export class SharedModule {}
