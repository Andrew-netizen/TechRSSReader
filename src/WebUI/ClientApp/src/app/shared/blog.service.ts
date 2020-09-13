import { Observable } from "rxjs";
import {
  BlogsClient,
  BlogDto,
  UpdateBlogCommand,
  CreateBlogCommand,
} from "../techrssreader-api";
import { map } from "rxjs/operators";

export class BlogService {
  constructor(private blogsClient: BlogsClient) {}

  getBlogs(): Observable<BlogDto[]> {
    return this.blogsClient.get().pipe(map((data) => data.blogs));
  }

  getBlogWithFeedItems(id: number): Observable<BlogDto> {
    return this.blogsClient.get2(id);
  }

  retrieveFeedItems(id: number): Observable<number> {
    return this.blogsClient.retrieveFeedItemsFromSource(id);
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
