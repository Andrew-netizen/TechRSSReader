import { Observable } from "rxjs";
import {
  BlogsClient,
  BlogDetailsDto,
  BlogDto,
  UpdateBlogCommand,
  CreateBlogCommand,
  RssFeedItemsClient,
  FeedItemsViewModel,
  WeeklyBlogSummaryViewModel,
  WeeklyBlogSummariesClient,
} from "../TechRSSReader-api";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class BlogService {
  constructor(
    private blogsClient: BlogsClient,
    private feedItemsClient: RssFeedItemsClient,
    private weeklyBlogSummariesClient: WeeklyBlogSummariesClient
  ) {}

  getBlogs(): Observable<BlogDto[]> {
    return this.blogsClient.get().pipe(map((data) => data.blogs));
  }

  getBlogWithFeedItems(id: number): Observable<BlogDetailsDto> {
    return this.blogsClient.get2(id);
  }

  retrieveFeedItems(id: number): Observable<number> {
    return this.blogsClient.retrieveFeedItemsFromSource(id);
  }

  getBookmarkedFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getBookmarked();
  }

  getTopRatedFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getTopRated();
  }

  getUnreadFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getUnread();
  }

  getAllBlogLatestSummaries(): Observable<WeeklyBlogSummaryViewModel> {
    return this.weeklyBlogSummariesClient.getAllBlogsLatest();
  }

  getWeeklyBlogSummaries(
    blogId: number
  ): Observable<WeeklyBlogSummaryViewModel> {
    return this.weeklyBlogSummariesClient.getLatest(blogId);
  }

  createBlog(blog: BlogDto): Observable<BlogDto> {
    const command: CreateBlogCommand = CreateBlogCommand.fromJS(blog);
    return this.blogsClient.create(command);
  }

  deleteBlog(blogId: number): Observable<number> {
    return this.blogsClient.delete(blogId);
  }

  updateBlog(blog: BlogDto): Observable<BlogDto> {
    const command: UpdateBlogCommand = UpdateBlogCommand.fromJS(blog);

    return this.blogsClient.update(blog.id, command);
  }
}
