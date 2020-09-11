import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeeditemDisplayComponent } from "./components/feeditem-display/feeditem-display.component";
import { BlogListComponent } from "./components/blog-list/blog-list.component";

@NgModule({
  declarations: [FeeditemDisplayComponent, BlogListComponent],
  imports: [CommonModule],
  exports: [BlogListComponent, FeeditemDisplayComponent]
})
export class SharedModule {}
