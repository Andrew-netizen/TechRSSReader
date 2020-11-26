import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";

import * as fromRoot from "./state/app.state";
import * as fromBlog from "./blog/state/blog.reducer";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  title = "app";
  isLoading$: Observable<boolean>;
  isLoadingSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(fromBlog.getIsLoading));

    this.isLoadingSubscription = this.isLoading$.subscribe(
      (loading: boolean) => {
        if (loading) this.spinner.show();
        else this.spinner.hide();
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }
}
