import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ToastrService } from "ngx-toastr";
import {
  getCurrentBlog,
  getError,
  getRetrievedFeedItemCount,
} from "../../state/blog.reducer";

import { BlogEditComponent } from "./blog-edit.component";

describe("BlogEditComponent", () => {
  let component: BlogEditComponent;
  let fixture: ComponentFixture<BlogEditComponent>;
  let store: MockStore;
  const formBuilder: FormBuilder = new FormBuilder();
  let mockRouter;
  let mockToastrService;

  beforeEach(async() => {
    mockRouter = jasmine.createSpyObj(["navigate"]);
    mockToastrService = jasmine.createSpyObj(["success"]);
    TestBed.configureTestingModule({
      declarations: [BlogEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: {currentBlogId: 1},
          selectors: [
            { selector: getCurrentBlog, value: {} },
            { selector: getError, value: "" },
            { selector: getRetrievedFeedItemCount, value: null },
          ],
        }),
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditComponent);
    component = fixture.componentInstance;
    component.blogForm = formBuilder.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],

      xmlAddress: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],

      keywordsToExclude: new FormArray([]),

      keywordsToInclude: new FormArray([]),
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
