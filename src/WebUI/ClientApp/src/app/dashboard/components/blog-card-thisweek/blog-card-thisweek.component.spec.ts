import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardThisweekComponent } from './blog-card-thisweek.component';

describe('BlogCardThisweekComponent', () => {
  let component: BlogCardThisweekComponent;
  let fixture: ComponentFixture<BlogCardThisweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCardThisweekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardThisweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
