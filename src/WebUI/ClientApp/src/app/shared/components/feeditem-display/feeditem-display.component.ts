import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RssFeedItemDto } from 'src/app/techrssreader-api';


@Component({
  selector: 'feeditem-display',
  templateUrl: './feeditem-display.component.html',
  styleUrls: ['./feeditem-display.component.scss']
})
export class FeeditemDisplayComponent {

  @Input() feedItem: RssFeedItemDto;
  @Output() articleMarkedAsRead = new EventEmitter<RssFeedItemDto>();
  @Output() titleClicked = new EventEmitter<RssFeedItemDto>();

  markAsReadClicked(feedItem: RssFeedItemDto): void {
    this.articleMarkedAsRead.emit(feedItem);
  }

  TitleClickedHandler(feedItem: RssFeedItemDto): void {
    this.titleClicked.emit(feedItem);
  }

}
