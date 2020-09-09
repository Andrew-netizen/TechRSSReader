import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDto } from 'src/app/techrssreader-api';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromBlog from '../state/blog.reducer';
import * as blogActions from '../state/blog.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {

  blogs$: Observable<BlogDto[]>;
  componentActive: boolean = true;
  errorMessage$: Observable<string>;
  selectedBlog: BlogDto | null;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<BlogDto[]>;

    this.store.dispatch(new blogActions.LoadBlogs());

    this.store.pipe(
      select(fromBlog.getCurrentBlog),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentBlog => this.selectedBlog = currentBlog
    );

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  blogSelected(blog: BlogDto): void {
    this.store.dispatch(new blogActions.SetCurrentBlog(blog));
  }

  newBlog(): void {
    this.store.dispatch(new blogActions.InitializeCurrentBlog());
  }
}
