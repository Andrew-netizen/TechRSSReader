import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";
import { AuthenticationResultStatus, AuthorizeService, IAuthenticationResult } from "../authorize.service";
import { INavigationState } from "../logout/logout.component";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter, mockAuthorizeService, mockQueryParamMap;
  let navigationState: INavigationState;
  let authenticationResult: IAuthenticationResult;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(["navigate", "navigateByUrl"]);
    mockAuthorizeService = jasmine.createSpyObj(["signIn", "completeSignIn"]);
    mockQueryParamMap = jasmine.createSpyObj(["get"]);
    navigationState = { returnUrl: "/articles/new" };
    authenticationResult = {status: AuthenticationResultStatus.Success, state: null};

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthorizeService, useValue: mockAuthorizeService },
        { provide: ActivatedRoute, useValue: {snapshot:{
          url: [new UrlSegment("authentication", {}), new UrlSegment("login", {})],
          queryParamMap: mockQueryParamMap,
          queryParams: navigationState
        } } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    mockAuthorizeService.signIn.and.returnValue(Promise.resolve(authenticationResult));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
