import {
  RssFeedItemsClient,
  RssFeedItemDto,
  UpdateFeedItemCommand
} from "../techrssreader-api";
import { Observable } from "rxjs";

export class TrainingService {
  constructor(private rssFeedItemsClient: RssFeedItemsClient) {}

  getTrainingFeedItem(blogId: number): Observable<RssFeedItemDto>{

    return this.rssFeedItemsClient.getNoUserPreference(blogId);
  }

  updateUserInterest(command: UpdateFeedItemCommand): Observable<RssFeedItemDto> {
    return this.rssFeedItemsClient.update(command.id,command);

  }
}
