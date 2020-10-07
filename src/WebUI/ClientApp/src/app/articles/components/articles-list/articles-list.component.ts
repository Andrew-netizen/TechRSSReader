import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RssFeedItemDto } from 'src/app/techrssreader-api';
import { DisplaySortOrder } from '../../state/articles.reducer';

@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  public DisplaySortOrderEnum = DisplaySortOrder;

  @Input() currentPage: number;
  @Input() displaySortOrder: DisplaySortOrder;
  @Input() excludeAlreadyRead: boolean;
  @Input() feedItems: RssFeedItemDto[];
  @Input() keywordExclusion: boolean;
  @Input() pageCount: number;
  @Input() selectedFeedItem: RssFeedItemDto;
  @Input() totalArticlesCount: number;
  @Output() currentPageUpdated = new EventEmitter<number>();
  @Output() excludeAlreadyReadUpdated = new EventEmitter<boolean>();
  @Output() keywordExclusionUpdated = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<RssFeedItemDto>();
  @Output() articleMarkedAsReadEvent = new EventEmitter<RssFeedItemDto>();
  @Output() titleClickedEvent = new EventEmitter();
  @Output() sortOrderUpdated = new EventEmitter<DisplaySortOrder>();

  currentPageUpdatedHandler(value: number): void {
    this.currentPageUpdated.emit(value);
  }

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

  sortOrderChanged(value: DisplaySortOrder): void {
    this.sortOrderUpdated.emit(value);
  }
}
