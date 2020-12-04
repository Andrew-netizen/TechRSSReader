import {
  RssFeedItemsClient,
  RssFeedItemDto,
  UpdateFeedItemCommand
} from "../TechRSSReader-api";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService {
  constructor(private rssFeedItemsClient: RssFeedItemsClient) {}

  updateFeedItem(command: UpdateFeedItemCommand): Observable<RssFeedItemDto> {
    return this.rssFeedItemsClient.update(command.id, command);
 }
}
