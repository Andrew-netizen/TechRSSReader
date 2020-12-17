import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  FeedItemUserTagDto,
  IRssFeedItemDetailsDto,
  RssFeedItemDto,
  UpdateFeedItemCommand,
} from "src/app/TechRSSReader-api";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "feeditem-display",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./feeditem-display.component.html",
  styleUrls: ["./feeditem-display.component.scss"],
})
export class FeeditemDisplayComponent {
  @Input() feedItem: IRssFeedItemDetailsDto;
  @Input() feedItemUserTags: FeedItemUserTagDto[];
  @Output() userClickedAddItemTag = new EventEmitter<RssFeedItemDto>();
  @Output() articleMarkedAsRead = new EventEmitter<RssFeedItemDto>();
  @Output() bookmarkToggled = new EventEmitter<RssFeedItemDto>();
  @Output() titleClicked = new EventEmitter<RssFeedItemDto>();
  @Output() userInterestUpdated = new EventEmitter<UpdateFeedItemCommand>();
  @Output() feedItemUserTagDeleted = new EventEmitter<FeedItemUserTagDto>();

  constructor(public domSanitizationService: DomSanitizer) {}

  addTagToItemClicked(feedItem: RssFeedItemDto): void {
    this.userClickedAddItemTag.emit(feedItem);
  }

  deleteItemTagClicked(feedItemUserTag: FeedItemUserTagDto): void {
    this.feedItemUserTagDeleted.emit(feedItemUserTag);
  }

  markAsReadClicked(feedItem: RssFeedItemDto): void {
    this.articleMarkedAsRead.emit(feedItem);
  }

  onBookmarkToggled(feedItem: RssFeedItemDto): void {
    this.bookmarkToggled.emit(feedItem);
  }

  TitleClickedHandler(feedItem: RssFeedItemDto): void {
    this.titleClicked.emit(feedItem);
  }

  updateUserInterest(command: UpdateFeedItemCommand): void {
    this.userInterestUpdated.emit(command);
  }
}
