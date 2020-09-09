import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { GenericValidator } from "../../shared/generic-validator";
import { takeWhile } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

/* NgRx */
import { Store, select } from "@ngrx/store";
import * as fromBlog from "../state/blog.reducer";
import * as fromRoot from "../../state/app.state";
import * as blogActions from "../state/blog.actions";
import {
  BlogDto,
  KeywordToExcludeDto,
  KeywordToIncludeDto,
} from "src/app/techrssreader-api";

@Component({
  selector: "blog-edit",
  templateUrl: "./blog-edit.component.html",
  styleUrls: ["./blog-edit.component.scss"],
})
export class BlogEditComponent implements OnInit, OnDestroy {
  pageTitle = "Edit Feed";
  errorMessage$: Observable<string>;
  componentActive: boolean = true;
  blogForm: FormGroup;
  blog: BlogDto | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get keywordsToExclude(): FormArray {
    return this.blogForm.get("keywordsToExclude") as FormArray;
  }

  get keywordsToInclude(): FormArray {
    return this.blogForm.get("keywordsToInclude") as FormArray;
  }

  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      title: {
        required: "Title is required.",
        minlength: "Title must be at least three characters.",
        maxlength: "Title cannot exceed 50 characters.",
      },
      xmlAddress: {
        required: "Xml Address is required.",
        minlength: "Xml Address must be at least five characters.",
        maxlength: "Xml Address cannot exceed 100 characters.",
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.blogForm = this.fb.group({
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

    // Watch for changes to the currently selected product
    this.store
      .pipe(
        select(fromBlog.getCurrentBlog),
        takeWhile(() => this.componentActive)
      )
      .subscribe((currentBlog) => this.displayBlog(currentBlog));

    // Watch for changes to the error message
    this.errorMessage$ = this.store.pipe(select(fromBlog.getError));

    // Watch for value changes
    this.blogForm.valueChanges.subscribe(
      (value) =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.blogForm
        ))
    );

    // Watch for changes in the number of retrieved feed items.
    // Show a toast to the user when this value changes.
    this.store
      .pipe(
        select(fromBlog.getRetrievedFeedItemCount),
        takeWhile(() => this.componentActive)
      )
      .subscribe((countRetrieved) =>
        this.showSuccessRetrieveFeedItems(countRetrieved)
      );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  convertKeywordsToIncludeToFormArray(
    keywordsToInclude: KeywordToIncludeDto[]
  ): FormArray {
    const result = new FormArray([]);

    if (keywordsToInclude) {
      for (const keywordToInclude of keywordsToInclude) {
        result.push(this.buildKeywordFormControl(keywordToInclude.keyword));
      }
    }

    return result;
  }

  convertFormArrayToKeywordsToIncludeDtos(
    input: FormArray
  ): KeywordToIncludeDto[] {
    const result: KeywordToIncludeDto[] = [];
    for (let inclusion of input.controls) {
      result.push(
        KeywordToExcludeDto.fromJS({
          blogId: this.blog.id,
          keyword: inclusion.value,
        })
      );
    }
    return result;
  }

  convertFormArrayToKeywordsToExcludeDtos(
    input: FormArray
  ): KeywordToExcludeDto[] {
    const result: KeywordToExcludeDto[] = [];
    for (let exclusion of input.controls) {
      result.push(
        KeywordToIncludeDto.fromJS({
          blogId: this.blog.id,
          keyword: exclusion.value,
        })
      );
    }
    return result;
  }

  convertKeywordsToExcludeToFormArray(
    keywordsToExclude: KeywordToExcludeDto[]
  ): FormArray {
    const result = new FormArray([]);

    if (keywordsToExclude) {
      for (const keywordToExclude of keywordsToExclude) {
        result.push(this.buildKeywordFormControl(keywordToExclude.keyword));
      }
    }

    return result;
  }

  buildKeywordFormControl(keyword: string): FormControl {
    return this.fb.control(keyword, Validators.required);
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.blogForm);
  }

  displayBlog(blog: BlogDto | null): void {
    // Set the local product property
    this.blog = blog;

    if (this.blog) {
      // Reset the form back to pristine
      this.blogForm.reset();

      // Display the appropriate page title
      if (this.blog.id === 0) {
        this.pageTitle = "Add Feed";
      } else {
        this.pageTitle = `Edit Feed: ${this.blog.title}`;
      }

      // Update the data on the form
      this.blogForm.patchValue({
        title: this.blog.title,
        xmlAddress: this.blog.xmlAddress,
      });

      this.blogForm.setControl(
        "keywordsToInclude",
        this.convertKeywordsToIncludeToFormArray(blog.keywordsToInclude)
      );
      this.blogForm.setControl(
        "keywordsToExclude",
        this.convertKeywordsToExcludeToFormArray(blog.keywordsToExclude)
      );
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayBlog(this.blog);
  }

  deleteBlog(): void {
    if (this.blog && this.blog.id) {
      if (confirm(`Really delete the blog: ${this.blog.title}?`)) {
        this.store.dispatch(new blogActions.DeleteBlog(this.blog.id));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(new blogActions.ClearCurrentBlog());
    }
  }

  saveBlog(blog: BlogDto): void {
    if (this.blogForm.valid) {
      if (this.blogForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const b = { ...this.blog, ...this.blogForm.value };
        b.keywordsToExclude = this.convertFormArrayToKeywordsToExcludeDtos(
          this.blogForm.get("keywordsToExclude") as FormArray
        );
        b.keywordsToInclude = this.convertFormArrayToKeywordsToIncludeDtos(
          this.blogForm.get("keywordsToInclude") as FormArray
        );
        if (b.id === 0) {
          this.store.dispatch(new blogActions.CreateBlog(b));
        } else {
          this.store.dispatch(new blogActions.UpdateBlog(b));
        }
      }
    } else {
      this.errorMessage$ = of("Please correct the validation errors.");
    }
  }

  addKeywordToInclude(): void {
    const includesFormArray = this.keywordsToInclude as FormArray;
    includesFormArray.push(this.buildKeywordFormControl(""));
  }

  removeKeywordToInclude(index: number): void {
    const includesFormArray = this.keywordsToInclude as FormArray;
    this.blogForm.markAsDirty();
    includesFormArray.removeAt(index);
  }

  addKeywordToExclude(): void {
    const excludesFormArray = this.keywordsToExclude as FormArray;
    excludesFormArray.push(this.buildKeywordFormControl(""));
  }

  removeKeywordToExclude(index: number): void {
    const excludesFormArray = this.keywordsToExclude as FormArray;
    this.blogForm.markAsDirty();
    excludesFormArray.removeAt(index);
  }

  retrieveFeedItems(): void {
    if (this.blog && this.blog.id) {
      this.store.dispatch(
        new blogActions.RetrieveFeedItemsFromSource(this.blog.id)
      );
    }
  }


  showSuccessRetrieveFeedItems(count: number): void {
    if (count != null)
    {
      const message = count + " feed articles retrieved";
      this.toastr.success(message, "Success!");
    }
  }
}
