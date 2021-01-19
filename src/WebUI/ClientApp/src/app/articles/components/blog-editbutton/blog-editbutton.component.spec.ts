import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { BlogEditbuttonComponent } from "./blog-editbutton.component";

describe("BlogEditbuttonComponent", () => {
  let component: BlogEditbuttonComponent;
  let fixture: ComponentFixture<BlogEditbuttonComponent>;
  let mockRouter;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(["navigate"]);
    await TestBed.configureTestingModule({
      declarations: [BlogEditbuttonComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
