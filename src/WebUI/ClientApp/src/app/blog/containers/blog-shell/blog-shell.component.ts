import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDto } from 'src/app/techrssreader-api';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromBlog from '../../state/blog.reducer';
import * as blogActions from '../../state/blog.actions';

@Component({
  selector: 'blog-shell',
  templateUrl: './blog-shell.component.html'
})
export class BlogShellComponent implements OnInit {
  selectedBlog$: Observable<BlogDto>;
  blogs$: Observable<BlogDto[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<BlogDto[]>;
    this.store.dispatch(new blogActions.LoadBlogs());
    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));
  }

  blogSelected(blog: BlogDto): void {
    this.store.dispatch(new blogActions.SetCurrentBlog(blog));
  }

}
