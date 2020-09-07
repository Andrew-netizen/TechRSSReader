import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogShellComponent } from "./blog-shell/blog-shell.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

/* NgRx */
import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/blog.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BlogEffects } from "./state/blog.effects";

import {BlogService} from './blog.service';
import { BlogEditComponent } from './blog-edit/blog-edit.component';

const blogRoutes: Routes = [
  {
    path: "blogs",
    component: BlogShellComponent,
    canActivate: [AuthorizeGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(blogRoutes),
    StoreModule.forFeature("blogs", reducer),
    EffectsModule.forFeature([BlogEffects]),
  ],
  exports: [],
  declarations: [BlogListComponent, BlogShellComponent, BlogEditComponent],
  providers: [BlogService],
})
export class BlogModule {}
