import { Observable } from "rxjs";
import {
  BlogsClient,
  BlogDetailsDto,
  BlogDto,
  UpdateBlogCommand,
  CreateBlogCommand,
  RssFeedItemDetailsDto,
  RssFeedItemsClient,
  FeedItemsViewModel,
  WeeklyBlogSummaryViewModel,
  WeeklyBlogSummariesClient,
  UserTagsClient,
  UserTagDto,
  CreateUserTagCommand,
  UserTagsViewModel,
  FeedItemUserTagsClient,
  FeedItemUserTagDto,
  CreateFeedItemUserTagCommand,
} from "../TechRSSReader-api";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class BlogService {
  constructor(
    private blogsClient: BlogsClient,
    private feedItemsClient: RssFeedItemsClient,
    private feedItemUserTagsClient: FeedItemUserTagsClient,
    private userTagsClient: UserTagsClient,
    private weeklyBlogSummariesClient: WeeklyBlogSummariesClient
  ) {}

  createBlog(blog: BlogDto): Observable<BlogDto> {
    const command: CreateBlogCommand = CreateBlogCommand.fromJS(blog);
    return this.blogsClient.create(command);
  }

  createFeedItemUserTag(
    feedItemUserTag: FeedItemUserTagDto
  ): Observable<FeedItemUserTagDto> {
    const command: CreateFeedItemUserTagCommand = CreateFeedItemUserTagCommand.fromJS(
      feedItemUserTag
    );
    return this.feedItemUserTagsClient.create(command);
  }

  createUserTag(userTag: UserTagDto): Observable<UserTagDto> {
    const command: CreateUserTagCommand = CreateUserTagCommand.fromJS(userTag);
    return this.userTagsClient.create(command);
  }

  deleteBlog(blogId: number): Observable<number> {
    return this.blogsClient.delete(blogId);
  }

  getAllBlogLatestSummaries(): Observable<WeeklyBlogSummaryViewModel> {
    return this.weeklyBlogSummariesClient.getAllBlogsLatest();
  }

  getBlogs(): Observable<BlogDto[]> {
    return this.blogsClient.get().pipe(map((data) => data.blogs));
  }

  getBlogWithFeedItems(id: number): Observable<BlogDetailsDto> {
    return this.blogsClient.get2(id);
  }

  getBookmarkedFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getBookmarked();
  }

  getFeedItemDetails(feedItemId: number): Observable<RssFeedItemDetailsDto> {
    return this.feedItemsClient.getFeedItemDetails(feedItemId);
  }

  getTaggedFeedItems(userTagId: number): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getTagged(userTagId);
  }

  getTopRatedFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getTopRated();
  }

  getUnreadFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getUnread();
  }

  getUserTags(): Observable<UserTagsViewModel> {
    return this.userTagsClient.get();
  }

  getWeeklyBlogSummaries(
    blogId: number
  ): Observable<WeeklyBlogSummaryViewModel> {
    return this.weeklyBlogSummariesClient.getLatest(blogId);
  }

  retrieveFeedItems(id: number): Observable<number> {
    return this.blogsClient.retrieveFeedItemsFromSource(id);
  }

  updateBlog(blog: BlogDto): Observable<BlogDto> {
    const command: UpdateBlogCommand = UpdateBlogCommand.fromJS(blog);

    return this.blogsClient.update(blog.id, command);
  }
}
