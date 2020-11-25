import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogstatsShellComponent } from './blogstats-shell.component';

describe('BlogstatsShellComponent', () => {
  let component: BlogstatsShellComponent;
  let fixture: ComponentFixture<BlogstatsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogstatsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogstatsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
