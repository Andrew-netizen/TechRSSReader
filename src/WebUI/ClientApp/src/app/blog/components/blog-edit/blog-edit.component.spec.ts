import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { By } from "@angular/platform-browser";
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
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should require a title", () => {
    const titleInput = fixture.debugElement.nativeElement.querySelector('#titleId');
    fixture.detectChanges();
    titleInput.value = "";
    titleInput.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.displayMessage.title).toBeTruthy();
  });


  it("should have no errors for title with only letters", () => {
    const titleInput = fixture.debugElement.nativeElement.querySelector('#titleId');
    fixture.detectChanges();
    titleInput.value = "Slashdot";
    titleInput.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.displayMessage.title).toBeFalsy();
  });

  it("should have an error for title with an exclamation mark", () => {
      const titleInput = fixture.debugElement.nativeElement.querySelector('#titleId');
      fixture.detectChanges();
      titleInput.text = "Slashdot!";
      titleInput.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.displayMessage.title).toBeTruthy();
  });

  it("should require an Xml Address", () => {
    const xmlAddressInput = fixture.debugElement.nativeElement.querySelector('#xmlAddressId');
    fixture.detectChanges();
    xmlAddressInput.value = "";
    xmlAddressInput.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.displayMessage.xmlAddress).toBeTruthy();
  });

it("should display no validation error when the Xml Address is a valid url", () => {
    const xmlAddressInput = fixture.debugElement.nativeElement.querySelector('#xmlAddressId');
    fixture.detectChanges();
    xmlAddressInput.value = "http://www.google.com";
    xmlAddressInput.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.displayMessage.xmlAddress).toBeFalsy();
  });

it("should display a validation error when the Xml Address has a script tag", () => {
    const xmlAddressInput = fixture.debugElement.nativeElement.querySelector('#xmlAddressId');
    fixture.detectChanges();
    xmlAddressInput.value = "http://www.google.com<script>";
    xmlAddressInput.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.displayMessage.xmlAddress).toBeTruthy();
  });

  it("should add a keyword to exclude field when the Add Keyword button is pressed", () => {
    let inputControls = fixture.debugElement.queryAll(By.css("input"));
    expect(inputControls.length).toEqual(2);
    fixture.componentInstance.addKeywordToExclude();
    fixture.detectChanges();
    inputControls = fixture.debugElement.queryAll(By.css("input"));
    expect(inputControls.length).toEqual(3);
  });


});
