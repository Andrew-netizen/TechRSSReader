import {
  RssFeedItemsClient,
  RssFeedItemDto,
  UpdateUserInterestedCommand
} from "../techrssreader-api";
import { Observable } from "rxjs";

export class TrainingService {
  constructor(private rssFeedItemsClient: RssFeedItemsClient) {}

  getTrainingFeedItem(blogId: number): Observable<RssFeedItemDto>{

    return this.rssFeedItemsClient.getNoUserPreference(blogId);
  }

  updateUserInterest(command: UpdateUserInterestedCommand): Observable<RssFeedItemDto> {
    return this.rssFeedItemsClient.updateUserInterested(command.id,command);
  }
}
