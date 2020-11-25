import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from "@ngrx/store";

import { BlogDto } from 'src/app/TechRSSReader-api';
import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";

@Component({
  selector: 'app-blogstats-shell',
  templateUrl: './blogstats-shell.component.html',
  styleUrls: ['./blogstats-shell.component.scss']
})
export class BlogstatsShellComponent implements OnInit {
  selectedBlog$: Observable<BlogDto>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.selectedBlog$ = this.store.pipe(select(fromBlog.getCurrentBlog));
  }

}
