import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DisplaySortOrder } from '../../../articles/state/articles.reducer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Store, select } from "@ngrx/store";


import * as fromRoot from "../../../state/app.state";
import * as fromArticles from "../../../articles/state";
import * as articlesActions from "../../../articles/state/articles.actions";

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  displaySortOrder$: Observable<DisplaySortOrder>;
  excludeAlreadyRead$: Observable<boolean>;
  keywordExclusion$: Observable<boolean>;

  public DisplaySortOrderEnum = DisplaySortOrder;

  constructor(public activeModal: NgbActiveModal, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.displaySortOrder$ = this.store.pipe(
      select(fromArticles.getDisplaySortOrder)
    );

    this.excludeAlreadyRead$ = this.store.pipe(
      select(fromArticles.getExcludeAlreadyRead)
    );

    this.keywordExclusion$ = this.store.pipe(
      select(fromArticles.getKeywordExclusion)
    );
  }

  excludeAlreadyReadChanged(value: boolean): void {
    this.store.dispatch(new articlesActions.ToggleAlreadyRead(value));
  }

  keywordExclusionChanged(value: boolean): void {
    this.store.dispatch(new articlesActions.ToggleKeywordExclusion(value));
  }


  sortOrderChanged(value: DisplaySortOrder): void {
      this.store.dispatch(new articlesActions.SetDisplaySortOrder(value));
  }

}
