import { Component,  OnInit } from '@angular/core';
import {  select, Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';


import * as fromRoot from "../state/app.state";
import * as fromBlog from "../blog/state/blog.reducer";
import * as blogActions from "../blog/state/blog.actions";
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SettingsModalComponent } from '../shared/components/settings-modal/settings-modal.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public navbarCollapsed: boolean = true;
  public isAuthenticated$: Observable<boolean>;
  public sidebarCollapsed$: Observable<boolean>;
  public collapsed: boolean = false;

  constructor(private store: Store<fromRoot.State>,
    private authorizeService: AuthorizeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
    this.sidebarCollapsed$ = this.store.pipe(select(fromBlog.getSidebarMenuCollapsed));
  }

  openSettingsModal(): void {
    this.modalService.open(SettingsModalComponent);
  }

  toggle() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  showSidebar(): void {
    this.store.dispatch(new blogActions.SetSidebarMenuCollapsed(false));
  }

}
