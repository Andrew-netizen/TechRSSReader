import { Observable } from "rxjs";
import {
  BlogsViewModel,
  BlogsClient,
  BlogDto,
  UpdateBlogCommand,
} from "../techrssreader-api";
import { map } from "rxjs/operators";

export class BlogService {
  constructor(private blogsClient: BlogsClient) {}

  getBlogs(): Observable<BlogDto[]> {
    return this.blogsClient.get().pipe(map((data) => data.blogs));
  }

  retrieveFeedItems(id: number): Observable<number> {
    return this.blogsClient.retrieveFeedItemsFromSource(id);
  }

  updateBlog(blog: BlogDto): Observable<BlogDto> {
    const command: UpdateBlogCommand = UpdateBlogCommand.fromJS(blog);

    return this.blogsClient.update(blog.id, command);
  }
}
