import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemtagModalComponent } from './add-itemtag-modal.component';

describe('AddItemtagModalComponent', () => {
  let component: AddItemtagModalComponent;
  let fixture: ComponentFixture<AddItemtagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemtagModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemtagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
