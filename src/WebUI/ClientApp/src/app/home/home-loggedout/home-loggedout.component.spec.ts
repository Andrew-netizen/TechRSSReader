import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoggedoutComponent } from './home-loggedout.component';

describe('HomeLoggedoutComponent', () => {
  let component: HomeLoggedoutComponent;
  let fixture: ComponentFixture<HomeLoggedoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLoggedoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLoggedoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
