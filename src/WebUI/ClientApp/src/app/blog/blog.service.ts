import { Observable } from "rxjs";
import { BlogsViewModel, BlogsClient, BlogDto } from "../techrssreader-api";
import { map } from "rxjs/operators";

export class BlogService {

  constructor (
    private blogsClient: BlogsClient
  ) {}

  getBlogs(): Observable<BlogDto[]> {
      return this.blogsClient.get()
      .pipe(
        map(data => data.blogs)
      );
  }
}
