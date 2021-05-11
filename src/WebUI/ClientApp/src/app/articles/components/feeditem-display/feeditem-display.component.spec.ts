import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeeditemDisplayComponent } from './feeditem-display.component';

describe('FeeditemDisplayComponent', () => {
  let component: FeeditemDisplayComponent;
  let fixture: ComponentFixture<FeeditemDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeditemDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeditemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
