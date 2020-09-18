import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeeditemDisplayComponent } from "./components/feeditem-display/feeditem-display.component";
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { PublishingDatePipe } from "./publishingdate.pipe";
import { StarComponent } from "./components/star/star.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    FeeditemDisplayComponent,
    BlogListComponent,
    PublishingDatePipe,
    StarComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    BlogListComponent,
    FeeditemDisplayComponent,
    PublishingDatePipe,
    StarComponent,
  ],
})
export class SharedModule {}
