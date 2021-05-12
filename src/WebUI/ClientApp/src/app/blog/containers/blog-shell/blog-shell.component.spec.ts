import { Component } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";

import { BlogShellComponent } from "./blog-shell.component";

describe("BlogShellComponent", () => {
  let component: BlogShellComponent;
  let fixture: ComponentFixture<BlogShellComponent>;
  let mockParamMap;
  let store: MockStore;

  @Component({
    selector: "app-blog-edit",
    template: "<div></div>",
  })
  class MockBlogEditComponent {
    pageTitle = "Edit Feed";
  }


  beforeEach(async () => {
    mockParamMap = jasmine.createSpyObj(["xxx"]);
    mockParamMap.get = (key: string) => 3;
    TestBed.configureTestingModule({
      declarations: [BlogShellComponent, MockBlogEditComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [],
        }),
        { provide: ActivatedRoute, useValue: { paramMap: of(mockParamMap) } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
