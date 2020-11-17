import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FeedItemSource } from 'src/app/blog/state/blog.reducer';
import { BlogDto, RssFeedItemDto } from 'src/app/TechRSSReader-api';

@Component({
  selector: 'articles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {

  public FeedItemSourceEnum = FeedItemSource;

  @Input() currentPage: number;
  @Input() feedItems: RssFeedItemDto[];
  @Input() feedItemSectionTitle: string;
  @Input() feedItemSource: FeedItemSource;
  @Input() pageCount: number;
  @Input() selectedBlog: BlogDto;
  @Input() selectedFeedItem: RssFeedItemDto;
  @Input() showBlogTitle: boolean;
  @Input() totalArticlesCount: number;
  @Output() articleBookmarkToggledEvent = new EventEmitter<RssFeedItemDto>();
  @Output() articleMarkedAsReadEvent = new EventEmitter<RssFeedItemDto>();
  @Output() currentPageUpdated = new EventEmitter<number>();
  @Output() selected = new EventEmitter<RssFeedItemDto>();
  @Output() titleClickedEvent = new EventEmitter();


  currentPageUpdatedHandler(value: number): void {
    this.currentPageUpdated.emit(value);
  }

  feedItemSelected(feedItem: RssFeedItemDto): void {
    this.selected.emit(feedItem);
  }

  markedAsReadHandler(value: RssFeedItemDto){
    this.articleMarkedAsReadEvent.emit(value);
  }

  bookmarkToggledHandler(value: RssFeedItemDto) {
    this.articleBookmarkToggledEvent.emit(value);
  }

  onTitleClicked() {
    this.titleClickedEvent.emit();
  }

}
