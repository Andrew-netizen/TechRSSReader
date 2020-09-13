import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogDto, RssFeedItemDto } from 'src/app/techrssreader-api';

import * as fromRoot from '../../../state/app.state';
import * as fromBlog from '../../../blog/state/blog.reducer';
import * as blogActions from '../../../blog/state/blog.actions';

@Component({
  selector: 'articles-shell',
  templateUrl: './articles-shell.component.html',
  styleUrls: ['./articles-shell.component.scss']
})
export class ArticlesShellComponent implements OnInit {

  selectedBlog$: Observable<BlogDto>;
  blogs$: Observable<BlogDto[]>;
  feedItems$: Observable<RssFeedItemDto[]>;
  selectedFeedItem$: Observable<RssFeedItemDto>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<BlogDto[]>;
    this.store.dispatch(new blogActions.LoadBlogs());
    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));
    this.feedItems$ = this.store.pipe(select(fromBlog.getCurrentBlogFeedItems));
    this.selectedFeedItem$ = this.store.pipe(select(fromBlog.getCurrentFeedItem));
  }

  blogSelected(blog: BlogDto): void {
    console.log("Blog Id is", blog.id);
    this.store.dispatch(new blogActions.LoadBlogWithItems(blog.id));
  }

  feedItemSelected(feedItem: RssFeedItemDto): void {
    this.store.dispatch(new blogActions.SetCurrentFeedItem(feedItem));
  }
}
