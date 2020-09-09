import { Component, OnInit } from '@angular/core';
import * as blogActions from '../../state/blog.actions';
/* NgRx */
import { Store} from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';

@Component({
  selector: 'blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  newBlog(): void {
    this.store.dispatch(new blogActions.InitializeCurrentBlog());
  }
}
