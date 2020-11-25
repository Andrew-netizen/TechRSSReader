import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { PublishingDatePipe } from "./publishingdate.pipe";
import { CategoriesPipe} from "./categories.pipe";
import {CategoriesSpacePipe} from './categoriesSpace.pipe';
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { StarComponent } from "./components/star/star.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";

import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
import { SettingsModalComponent } from "./components/settings-modal/settings-modal.component";
import { RateFeeditemComponent } from "./components/rate-feeditem/rate-feeditem.component";
import { NavSearchComponent } from './components/nav-search/nav-search.component';
import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  declarations: [
    CategoriesPipe,
    CategoriesSpacePipe,
    NavMenuComponent,
    PublishingDatePipe,
    StarComponent,
    PaginatorComponent,
    SidebarMenuComponent,
    SettingsModalComponent,
    RateFeeditemComponent,
    NavSearchComponent,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CategoriesPipe,
    CategoriesSpacePipe,
    NavMenuComponent,
    PaginatorComponent,
    PublishingDatePipe,
    RateFeeditemComponent,
    StarComponent,
    SidebarMenuComponent,
  ],
})
export class SharedModule {}
