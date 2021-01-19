import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BlogDto } from 'src/app/TechRSSReader-api';

import { BlogStatsbuttonComponent } from './blog-statsbutton.component';

describe('BlogStatsbuttonComponent', () => {
  let component: BlogStatsbuttonComponent;
  let fixture: ComponentFixture<BlogStatsbuttonComponent>;
  let mockRouter;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(["navigate"]);

    await TestBed.configureTestingModule({
      declarations: [ BlogStatsbuttonComponent ],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogStatsbuttonComponent);
    component = fixture.componentInstance;
    component.blog = BlogDto.fromJS({id: 1});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
