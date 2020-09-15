import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RssFeedItemDto } from 'src/app/techrssreader-api';

@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  @Input() excludeAlreadyRead: boolean;
  @Input() keywordExclusion: boolean;
  @Input() feedItems: RssFeedItemDto[];
  @Input() selectedFeedItem: RssFeedItemDto;
  @Output() excludeAlreadyReadUpdated = new EventEmitter<boolean>();
  @Output() keywordExclusionUpdated = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<RssFeedItemDto>();
  @Output() articleMarkedAsReadEvent = new EventEmitter<RssFeedItemDto>();
  @Output() titleClickedEvent = new EventEmitter();

  feedItemSelected(feedItem: RssFeedItemDto): void {
    this.selected.emit(feedItem);
  }

  excludeAlreadyReadChanged(value: boolean): void {
    this.excludeAlreadyReadUpdated.emit(value);
  }

  keywordExclusionChanged(value: boolean): void {
    this.keywordExclusionUpdated.emit(value);
  }

  markedAsReadHandler(value: RssFeedItemDto){
    this.articleMarkedAsReadEvent.emit(value);
  }

  onTitleClicked() {
    this.titleClickedEvent.emit();
  }

}
