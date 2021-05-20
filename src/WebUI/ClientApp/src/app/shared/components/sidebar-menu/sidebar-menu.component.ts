import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { BlogDto, UserTagDto } from "src/app/TechRSSReader-api";

import * as fromRoot from "../../../state/app.state";
import * as fromBlog from "../../../blog/state/blog.reducer";
import * as blogActions from "../../../blog/state/blog.actions";
import * as articlesActions from "../../../articles/state/articles.actions";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { distinctUntilChanged } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddtagModalComponent } from "../addtag-modal/addtag-modal.component";

@Component({
  selector: "app-sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./sidebar-menu.component.scss"],
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  public blogs$: Observable<BlogDto[]>;
  public collapsed$: Observable<boolean>;
  public isAuthenticated$: Observable<boolean>;
  public showMenuCollapseButton: boolean = false;
  public userTags$: Observable<UserTagDto[]>;

  // Subscriptions
  private authenticationSubscription: Subscription;
  private breakpointSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private authorizeService: AuthorizeService,
    private breakpointObserver: BreakpointObserver,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.blogs$ = this.store.pipe(select(fromBlog.getBlogs)) as Observable<
      BlogDto[]
    >;
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
    this.authenticationSubscription = this.isAuthenticated$
      .pipe(
        // If previous query is different from current
        distinctUntilChanged()
        // Subscription from response
      )
      .subscribe((authenticated) => {
        if (authenticated) {
          this.store.dispatch(new blogActions.LoadBlogs());
          this.store.dispatch(new blogActions.ClearCurrentBlog());
          this.store.dispatch(new blogActions.LoadUserTags());
        } else {
          this.store.dispatch(new blogActions.ClearBlogs());
        }
      });

    this.collapsed$ = this.store.pipe(select(fromBlog.getSidebarMenuCollapsed));

    this.userTags$ = this.store.pipe(
      select(fromBlog.getUserTags)
    ) as Observable<UserTagDto[]>;

    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((state: BreakpointState) => {
        this.showMenuCollapseButton = state.matches;
        if (!state.matches)
          this.store.dispatch(new blogActions.SetSidebarMenuCollapsed(false));
      });
  }

  ngOnDestroy(): void {
    this.authenticationSubscription.unsubscribe();
    this.breakpointSubscription.unsubscribe();
  }

  hideMenu(): void {
    this.store.dispatch(new blogActions.SetSidebarMenuCollapsed(true));
  }

  menuItemClicked(): void {
    if (this.showMenuCollapseButton)
      this.store.dispatch(new blogActions.SetSidebarMenuCollapsed(true));
    this.store.dispatch(new articlesActions.SetFilterText(null));
  }

  openAddTagModal(): void {
    this.modalService.open(AddtagModalComponent);
  }
}
