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
  IRssFeedItemDto,
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
  @Output() userClickedAddItemTag = new EventEmitter<IRssFeedItemDto>();
  @Output() articleMarkedAsRead = new EventEmitter<IRssFeedItemDto>();
  @Output() bookmarkToggled = new EventEmitter<IRssFeedItemDto>();
  @Output() titleClicked = new EventEmitter<IRssFeedItemDto>();
  @Output() userInterestUpdated = new EventEmitter<UpdateFeedItemCommand>();
  @Output() feedItemUserTagDeleted = new EventEmitter<FeedItemUserTagDto>();

  constructor(public domSanitizationService: DomSanitizer) {}

  addTagToItemClicked(feedItem: IRssFeedItemDto): void {
    this.userClickedAddItemTag.emit(feedItem);
  }

  deleteItemTagClicked(feedItemUserTag: FeedItemUserTagDto): void {
    this.feedItemUserTagDeleted.emit(feedItemUserTag);
  }

  markAsReadClicked(feedItem: IRssFeedItemDto): void {
    this.articleMarkedAsRead.emit(feedItem);
  }

  onBookmarkToggled(feedItem: IRssFeedItemDto): void {
    this.bookmarkToggled.emit(feedItem);
  }

  TitleClickedHandler(feedItem: IRssFeedItemDto): void {
    this.titleClicked.emit(feedItem);
  }

  updateUserInterest(command: UpdateFeedItemCommand): void {
    this.userInterestUpdated.emit(command);
  }
}
