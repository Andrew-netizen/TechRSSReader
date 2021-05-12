import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlogChartComponent } from "./blog-chart.component";

describe("BlogChartComponent", () => {
  let component: BlogChartComponent;
  let fixture: ComponentFixture<BlogChartComponent>;

  @Component({
    selector: "ngx-charts-line-chart",
    template: "<div></div>",
  })
  class MockNgxLineChartComponent {
    @Input() legend;
    @Input() scheme;
    @Input() results;
    @Input() showXAxisLabel;
    @Input() showYAxisLabel;
    @Input() timeline;
    @Input() view;
    @Input() xAxis;
    @Input() xAxisLabel;
    @Input() yAxis;
    @Input() yAxisLabel;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogChartComponent, MockNgxLineChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
