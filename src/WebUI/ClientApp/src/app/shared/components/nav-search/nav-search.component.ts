import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";

/* NgRx */
import { select, Store } from "@ngrx/store";
import * as fromRoot from "../../../state/app.state";
import * as fromArticles from "../../../articles/state";
import * as articlesActions from "../../../articles/state/articles.actions";

@Component({
  selector: "[app-nav-search]",
  templateUrl: "./nav-search.component.html",
  styleUrls: ["./nav-search.component.scss"],
})
export class NavSearchComponent implements OnInit, OnDestroy {
  @ViewChild("feedItemFilterInput", { static: true })
  feedItemFilterInput: ElementRef;

  filterInputSubscription: Subscription;
  filterInputText$: Observable<string | null>;

  constructor(private store: Store<fromRoot.State>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.filterInputSubscription = fromEvent(
      this.feedItemFilterInput.nativeElement,
      "keyup"
    )
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        // if string length greater than 2
        filter((res) => (res.length > 1) || (res.length === 0)),
        // Time in milliseconds between key events
        debounceTime(100),
        // If previous query is different from current
        distinctUntilChanged()
        // Subscription from response
      )
      .subscribe(
        (value: string) => {
          this.store.dispatch(new articlesActions.SetFilterText(value.toLocaleLowerCase()));
        }
      );

      this.filterInputText$ = this.store.pipe(
        select(fromArticles.getFilterText)
      );

      this.filterInputText$.subscribe(
        (value: string | null) => {
          if ((value == null) || (value === ""))
          {
            this.renderer.setProperty(this.feedItemFilterInput.nativeElement, 'value', value);

          }
        }
      )
  }

  ngOnDestroy(): void {
    this.filterInputSubscription.unsubscribe();
  }
}
