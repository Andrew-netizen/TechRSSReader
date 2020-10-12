import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { FeedItemSource } from "../../../blog/state/blog.reducer";

@Component({
  selector: 'articles-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './articles-menu.component.html',
  styleUrls: ['./articles-menu.component.scss']
})
export class ArticlesMenuComponent {

  public FeedItemSourceEnum = FeedItemSource;

  @Input() feedItemSource: FeedItemSource;
  @Output() bookmarksSelected = new EventEmitter();
  @Output() unreadSelected = new EventEmitter();

  bookmarksSelectedHandler(): void {
    this.bookmarksSelected.emit();
  }

  unreadSelectedHandler(): void {
    this.unreadSelected.emit();
  }
}
