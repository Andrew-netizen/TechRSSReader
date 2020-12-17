import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FeedItemSource } from 'src/app/blog/state/blog.reducer';
import { BlogDto, FeedItemUserTagDto, RssFeedItemDetailsDto, RssFeedItemDto, UpdateFeedItemCommand } from 'src/app/TechRSSReader-api';

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
  @Input() feedItemUserTags: FeedItemUserTagDto[];
  @Input() pageCount: number;
  @Input() selectedBlog: BlogDto;
  @Input() selectedFeedItem: RssFeedItemDetailsDto;
  @Input() showBlogTitle: boolean;
  @Input() totalArticlesCount: number;
  @Output() addItemTagClickedEvent = new EventEmitter<RssFeedItemDto>();
  @Output() articleBookmarkToggledEvent = new EventEmitter<RssFeedItemDto>();
  @Output() articleMarkedAsReadEvent = new EventEmitter<RssFeedItemDto>();
  @Output() currentPageUpdated = new EventEmitter<number>();
  @Output() feedItemUserTagDeleted = new EventEmitter<FeedItemUserTagDto>();
  @Output() selected = new EventEmitter<RssFeedItemDto>();
  @Output() titleClickedEvent = new EventEmitter();
  @Output() userInterestUpdated = new EventEmitter<UpdateFeedItemCommand>();

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

  onAddItemTagClicked(value: RssFeedItemDto) {
    this.addItemTagClickedEvent.emit(value);
  }

  onFeedItemUserTagDeleted(value: FeedItemUserTagDto)
  {
    this.feedItemUserTagDeleted.emit(value);
  }

  onTitleClicked() {
    this.titleClickedEvent.emit();
  }

  handleUserInterestUpdate(value: UpdateFeedItemCommand): void {
    this.userInterestUpdated.emit(value);
  }
}
