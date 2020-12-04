import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtagModalComponent } from './addtag-modal.component';

describe('AddtagModalComponent', () => {
  let component: AddtagModalComponent;
  let fixture: ComponentFixture<AddtagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtagModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
