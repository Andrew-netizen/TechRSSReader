import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditbuttonComponent } from './blog-editbutton.component';

describe('BlogEditbuttonComponent', () => {
  let component: BlogEditbuttonComponent;
  let fixture: ComponentFixture<BlogEditbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
