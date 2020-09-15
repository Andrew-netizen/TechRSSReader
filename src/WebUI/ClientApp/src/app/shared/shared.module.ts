import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeeditemDisplayComponent } from "./components/feeditem-display/feeditem-display.component";
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { PublishingDatePipe } from './publishingdate.pipe';

@NgModule({
  declarations: [FeeditemDisplayComponent, BlogListComponent, PublishingDatePipe],
  imports: [CommonModule],
  exports: [BlogListComponent, FeeditemDisplayComponent, PublishingDatePipe]
})
export class SharedModule {}
