import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FeedItemSource } from "../../../blog/state/blog.reducer";

@Component({
  selector: 'articles-menu',
  templateUrl: './articles-menu.component.html',
  styleUrls: ['./articles-menu.component.scss']
})
export class ArticlesMenuComponent {

  public FeedItemSourceEnum = FeedItemSource;

  @Input() feedItemSource: FeedItemSource;
  @Output() bookmarksSelected = new EventEmitter();

  bookmarksSelectedHandler(): void {
    this.bookmarksSelected.emit();
  }
}
