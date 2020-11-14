import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { FeeditemDisplayComponent } from "./components/feeditem-display/feeditem-display.component";
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { PublishingDatePipe } from "./publishingdate.pipe";
import { StarComponent } from "./components/star/star.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    FeeditemDisplayComponent,
    BlogListComponent,
    PublishingDatePipe,
    StarComponent,
    PaginatorComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, NgbModule],
  exports: [
    BlogListComponent,
    FeeditemDisplayComponent,
    PaginatorComponent,
    PublishingDatePipe,
    StarComponent,
  ],
})
export class SharedModule {}
