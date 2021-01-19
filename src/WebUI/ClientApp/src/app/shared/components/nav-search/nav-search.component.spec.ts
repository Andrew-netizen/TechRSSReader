import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getFilterText } from 'src/app/articles/state';

import { NavSearchComponent } from './nav-search.component';

describe('NavSearchComponent', () => {
  let component: NavSearchComponent;
  let fixture: ComponentFixture<NavSearchComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSearchComponent ],
      providers:[
        provideMockStore({
          initialState: {},
          selectors: [
            {selector: getFilterText, value: ""}
          ]
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
