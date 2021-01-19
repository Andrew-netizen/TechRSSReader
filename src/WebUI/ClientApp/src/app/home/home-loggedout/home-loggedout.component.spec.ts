import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeLoggedoutComponent } from './home-loggedout.component';


@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  natigatedTo: any = null;

  onClick() {
    this.natigatedTo = this.linkParams;
  }
}

describe('HomeLoggedoutComponent', () => {
  let component: HomeLoggedoutComponent;
  let fixture: ComponentFixture<HomeLoggedoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLoggedoutComponent, RouterLinkDirectiveStub ]
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
