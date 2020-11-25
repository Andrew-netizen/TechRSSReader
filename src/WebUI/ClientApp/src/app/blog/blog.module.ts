import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BlogShellComponent } from "./containers/blog-shell/blog-shell.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { SharedModule } from "../shared/shared.module";
/* NgRx */
import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/blog.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BlogEffects } from "./state/blog.effects";

import {BlogService} from '../shared/blog.service';
import { BlogEditComponent } from './components/blog-edit/blog-edit.component';

const blogRoutes: Routes = [
  {
    path: "blogs/:id",
    component: BlogShellComponent,
    canActivate: [AuthorizeGuard],
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(blogRoutes),
    StoreModule.forFeature("blogs", reducer),
    EffectsModule.forFeature([BlogEffects]),
  ],
  exports: [],
  declarations: [BlogShellComponent, BlogEditComponent],
  providers: [BlogService],
})
export class BlogModule {}
