import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { BlogDto } from "src/app/techrssreader-api";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../state/blog.reducer";
import * as blogActions from "../../state/blog.actions";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "blog-shell",
  templateUrl: "./blog-shell.component.html",
})
export class BlogShellComponent implements OnInit, OnDestroy {
  paramMapSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramMapSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.get("id") === "add")
          this.store.dispatch(new blogActions.InitializeCurrentBlog());
        if (!isNaN(Number(params.get("id")))) {
          this.blogMenuItemSelected(Number(params.get("id")));
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  blogMenuItemSelected(blogId: number): void {
    this.store.dispatch(new blogActions.SetCurrentBlogId(blogId));
  }
}
