import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getDisplaySortOrder, getExcludeAlreadyRead, getKeywordExclusion } from 'src/app/articles/state';
import { DisplaySortOrder } from 'src/app/articles/state/articles.reducer';

import { SettingsModalComponent } from './settings-modal.component';

describe('SettingsModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsModalComponent ],
      providers: [
        {provide: NgbActiveModal, useValue: NgbActiveModal},
        provideMockStore({
          initialState: { weeklyBlogSummaries: []},
          selectors: [
            {selector: getDisplaySortOrder, value: DisplaySortOrder.PredictedRating},
            {selector: getExcludeAlreadyRead, value: true},
            {selector: getKeywordExclusion, value: true}
          ]
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
