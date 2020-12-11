import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogChartComponent } from './blog-chart.component';

describe('BlogChartComponent', () => {
  let component: BlogChartComponent;
  let fixture: ComponentFixture<BlogChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
