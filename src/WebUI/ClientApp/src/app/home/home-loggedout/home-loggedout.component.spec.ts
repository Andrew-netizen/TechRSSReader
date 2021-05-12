import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeLoggedoutComponent } from './home-loggedout.component';


@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
export class RouterLinkStubDirective {
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
      declarations: [ HomeLoggedoutComponent, RouterLinkStubDirective ]
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
