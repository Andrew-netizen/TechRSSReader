import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFeeditemComponent } from './rate-feeditem.component';

describe('RateFeeditemComponent', () => {
  let component: RateFeeditemComponent;
  let fixture: ComponentFixture<RateFeeditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateFeeditemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateFeeditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
