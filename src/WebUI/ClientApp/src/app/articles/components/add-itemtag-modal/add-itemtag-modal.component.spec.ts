import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AddItemtagModalComponent } from "./add-itemtag-modal.component";

describe("AddItemtagModalComponent", () => {
  let component: AddItemtagModalComponent;
  let fixture: ComponentFixture<AddItemtagModalComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemtagModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: NgbActiveModal, useValue: NgbActiveModal },
        { provide: FormBuilder, useValue: formBuilder },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemtagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
