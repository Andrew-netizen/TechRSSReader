import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BlogCardThisweekComponent } from './blog-card-thisweek.component';

describe('BlogCardThisweekComponent', () => {
  let component: BlogCardThisweekComponent;
  let fixture: ComponentFixture<BlogCardThisweekComponent>;
  let mockRouter;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(["navigate"]);

    await TestBed.configureTestingModule({
      declarations: [ BlogCardThisweekComponent ],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
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
