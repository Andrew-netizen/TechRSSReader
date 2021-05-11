import { Directive, Input } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { AuthorizeService } from "../authorize.service";

import { LoginMenuComponent } from "./login-menu.component";

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

describe("LoginMenuComponent", () => {
  let component: LoginMenuComponent;
  let fixture: ComponentFixture<LoginMenuComponent>;
  let mockAuthorizeService;

  beforeEach(waitForAsync(() => {
    mockAuthorizeService = jasmine.createSpyObj(["isAuthenticated"]);

    TestBed.configureTestingModule({
      declarations: [LoginMenuComponent, RouterLinkDirectiveStub],
      providers: [
        { provide: AuthorizeService, useValue: mockAuthorizeService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    mockAuthorizeService.isAuthenticated.and.returnValue(of(true));
    expect(component).toBeTruthy();
  });
});
