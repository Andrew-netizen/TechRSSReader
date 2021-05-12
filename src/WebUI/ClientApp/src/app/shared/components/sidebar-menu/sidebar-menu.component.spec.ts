import { Directive, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  getBlogs,
  getSidebarMenuCollapsed,
  getUserTags,
} from "src/app/blog/state/blog.reducer";

import { SidebarMenuComponent } from "./sidebar-menu.component";


@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
export class StubRouterLinkDirective {
  @Input("routerLink") linkParams: any;
  natigatedTo: any = null;

  onClick() {
    this.natigatedTo = this.linkParams;
  }
}

describe("SidebarMenuComponent", () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarMenuComponent, StubRouterLinkDirective],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: getBlogs, value: [] },
            { selector: getSidebarMenuCollapsed, value: true },
            { selector: getUserTags, value: []}
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
