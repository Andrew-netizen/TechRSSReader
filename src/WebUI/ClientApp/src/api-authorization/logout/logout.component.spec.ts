import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";
import { of } from "rxjs";
import { AuthenticationResultStatus, AuthorizeService, IAuthenticationResult } from "../authorize.service";
import { INavigationState } from "./logout.component";
import { LogoutComponent } from "./logout.component";

describe("LogoutComponent", () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let mockRouter, mockAuthorizeService;
  let navigationState: INavigationState;
  let authenticationResult: IAuthenticationResult;

  beforeEach(waitForAsync(() => {
    window.history.pushState({local: true}, '', '');
    mockRouter = jasmine.createSpyObj(["navigate"]);
    mockAuthorizeService = jasmine.createSpyObj([
      "signOut",
      "completeSignOut",
      "isAuthenticated"
    ]);

    navigationState = { returnUrl: "/authentication/logged-out" };
    authenticationResult = {status: AuthenticationResultStatus.Redirect };

    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthorizeService, useValue: mockAuthorizeService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [new UrlSegment("authentication", {}), new UrlSegment("logout", {})],
              queryParams: navigationState,
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    mockAuthorizeService.isAuthenticated.and.returnValue(of(true));
    mockAuthorizeService.signOut.and.returnValue(authenticationResult);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
