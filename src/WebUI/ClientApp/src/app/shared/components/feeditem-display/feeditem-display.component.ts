import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { RssFeedItemDto } from 'src/app/TechRSSReader-api';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'feeditem-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feeditem-display.component.html',
  styleUrls: ['./feeditem-display.component.scss']
})
export class FeeditemDisplayComponent {

  @Input() feedItem: RssFeedItemDto;
  @Output() articleMarkedAsRead = new EventEmitter<RssFeedItemDto>();
  @Output() bookmarkToggled = new EventEmitter<RssFeedItemDto>();
  @Output() titleClicked = new EventEmitter<RssFeedItemDto>();

constructor(public domSanitizationService: DomSanitizer) {}

  markAsReadClicked(feedItem: RssFeedItemDto): void {
    this.articleMarkedAsRead.emit(feedItem);
  }

  onBookmarkToggled(feedItem: RssFeedItemDto): void {
    this.bookmarkToggled.emit(feedItem);
  }

  TitleClickedHandler(feedItem: RssFeedItemDto): void {
    this.titleClicked.emit(feedItem);
  }

}
