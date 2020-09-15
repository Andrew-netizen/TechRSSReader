import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { SharedModule } from "../shared/shared.module";

import { ArticlesShellComponent } from './containers/articles-shell/articles-shell.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/articles.reducer';


const articlesRoutes: Routes = [
  {
    path: "articles",
    component: ArticlesShellComponent,
    canActivate: [AuthorizeGuard],
  },
];


@NgModule({
  declarations: [ArticlesShellComponent, ArticlesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(articlesRoutes),
    StoreModule.forFeature('articles', reducer),
  ]
})
export class ArticlesModule { }
