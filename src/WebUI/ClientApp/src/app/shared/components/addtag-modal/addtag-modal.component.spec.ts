import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import { AddtagModalComponent } from "./addtag-modal.component";

describe("AddtagModalComponent", () => {
  let component: AddtagModalComponent;
  let fixture: ComponentFixture<AddtagModalComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtagModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: NgbActiveModal, useValue: NgbActiveModal },
        { provide: FormBuilder, useValue: formBuilder },
        provideMockStore({
          initialState: {},
          selectors: []
        })
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtagModalComponent);
    component = fixture.componentInstance;
    component.addTagForm = formBuilder.group({ text: "" });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
