import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { SharedModule } from "../shared/shared.module";

import { ArticlesShellComponent } from './containers/articles-shell/articles-shell.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesMenuComponent } from './components/articles-menu/articles-menu.component';
import { FeeditemDisplayComponent } from "./components/feeditem-display/feeditem-display.component";
import { BlogEditbuttonComponent } from './components/blog-editbutton/blog-editbutton.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/articles.reducer';
import { BlogStatsbuttonComponent } from './components/blog-statsbutton/blog-statsbutton.component';

const articlesRoutes: Routes = [
  {
    path: "articles/:id",
    component: ArticlesShellComponent,
    canActivate: [AuthorizeGuard],
  },
];


@NgModule({
  declarations: [ArticlesShellComponent, ArticlesListComponent, ArticlesMenuComponent, BlogEditbuttonComponent, FeeditemDisplayComponent, BlogStatsbuttonComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forChild(articlesRoutes),
    StoreModule.forFeature('articles', reducer),
  ]
})
export class ArticlesModule {
  constructor() {
  }
 }
