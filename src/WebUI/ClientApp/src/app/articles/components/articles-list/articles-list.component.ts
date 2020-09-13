import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RssFeedItemDto } from 'src/app/techrssreader-api';

@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  @Input() feedItems: RssFeedItemDto[];
  @Input() selectedFeedItem: RssFeedItemDto;
  @Output() selected = new EventEmitter<RssFeedItemDto>();

  feedItemSelected(feedItem: RssFeedItemDto): void {
    this.selected.emit(feedItem);
  }
}
