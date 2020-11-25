import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogStatsbuttonComponent } from './blog-statsbutton.component';

describe('BlogStatsbuttonComponent', () => {
  let component: BlogStatsbuttonComponent;
  let fixture: ComponentFixture<BlogStatsbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogStatsbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogStatsbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
