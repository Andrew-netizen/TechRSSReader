import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogShellComponent } from './blog-shell.component';

describe('BlogShellComponent', () => {
  let component: BlogShellComponent;
  let fixture: ComponentFixture<BlogShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
