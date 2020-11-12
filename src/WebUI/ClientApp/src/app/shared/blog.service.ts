import { Observable } from "rxjs";
import {
  BlogsClient,
  BlogDto,
  UpdateBlogCommand,
  CreateBlogCommand, RssFeedItemDto, RssFeedItemsClient, FeedItemsViewModel
} from "../TechRSSReader-api";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class BlogService {
  constructor(private blogsClient: BlogsClient,
            private feedItemsClient: RssFeedItemsClient) {}

  getBlogs(): Observable<BlogDto[]> {
    return this.blogsClient.get().pipe(map((data) => data.blogs));
  }

  getBlogWithFeedItems(id: number): Observable<BlogDto> {
    return this.blogsClient.get2(id);
  }

  retrieveFeedItems(id: number): Observable<number> {
    return this.blogsClient.retrieveFeedItemsFromSource(id);
  }

  getBookmarkedFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getBookmarked();
  }

  getUnreadFeedItems(): Observable<FeedItemsViewModel> {
    return this.feedItemsClient.getUnread();
  }

  createBlog(blog:BlogDto): Observable<BlogDto> {
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
