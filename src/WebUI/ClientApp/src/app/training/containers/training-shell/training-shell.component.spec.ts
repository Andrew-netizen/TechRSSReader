import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingShellComponent } from './training-shell.component';

describe('TrainingShellComponent', () => {
  let component: TrainingShellComponent;
  let fixture: ComponentFixture<TrainingShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
