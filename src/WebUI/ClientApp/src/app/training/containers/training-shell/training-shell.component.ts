import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDto, RssFeedItemDto, UpdateFeedItemCommand } from 'src/app/techrssreader-api';
import * as fromRoot from '../../../state/app.state';
import * as fromBlog from '../../../blog/state/blog.reducer';
import * as fromTraining from '../../state/training.reducer';
import * as blogActions from '../../../blog/state/blog.actions';
import * as trainingActions from '../../state/training.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'training-shell',
  templateUrl: './training-shell.component.html',
  styleUrls: ['./training-shell.component.scss']
})
export class TrainingShellComponent implements OnInit {
  selectedBlog$: Observable<BlogDto>;
  blogs$: Observable<BlogDto[]>;
  currentFeedItem$: Observable<RssFeedItemDto>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<BlogDto[]>;
    this.store.dispatch(new blogActions.LoadBlogs());
    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));
    this.currentFeedItem$ = this.store.pipe(select(fromTraining.getCurrentFeedItem))
  }

  blogSelected(blog: BlogDto): void {
    this.store.dispatch(new blogActions.SetCurrentBlog(blog));
  }

  updateUserInterest(command: UpdateFeedItemCommand): void {
    this.store.dispatch(new trainingActions.UpdateUserInterest(command));
  }

  loadTrainingFeedItem(blog: BlogDto): void {
    if (blog)
    {
      this.store.dispatch(new trainingActions.GetTrainingItem(blog.id));
    }
    else {
      alert('Please select a feed before trying to load an article');
    }

  }

  toggleItemBookmark(value: RssFeedItemDto): void {
    const command: UpdateFeedItemCommand = UpdateFeedItemCommand.fromJS({
      id: value.id,
      bookmarked: !value.bookmarked,
      readAlready: value.readAlready,
      userRating: value.userRating,
    });
    this.store.dispatch(new trainingActions.ToggleBookmark(command));
  }

}
