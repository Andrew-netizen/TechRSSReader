import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

// Fontawesome imports
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faStar as falStar} from '@fortawesome/pro-light-svg-icons';
import { faBookmark as farBookmark} from "@fortawesome/pro-regular-svg-icons";
import {faBookmark as fasBookmark} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/pro-regular-svg-icons";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { ApiAuthorizationModule } from "src/api-authorization/api-authorization.module";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { AuthorizeInterceptor } from "src/api-authorization/authorize.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BlogModule } from "./blog/blog.module";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { TrainingModule } from "./training/training.module";
import { ArticlesModule } from "./articles/articles.module";

/* NgRx */
import { StoreModule, MetaReducer, ActionReducerMap } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { storeFreeze } from "ngrx-store-freeze";
import { State } from "./state/app.state";
import * as articlesReducer from './articles/state/articles.reducer';
import * as blogReducer from "./blog/state/blog.reducer";
import * as trainingReducer from "./training/state/training.reducer";

export const reducers: ActionReducerMap<State> = {
  // reducers
  articles: articlesReducer.reducer,
  blogs: blogReducer.reducer,
  training: trainingReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BlogModule,
    SharedModule,
    TrainingModule,
    ArticlesModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      {
        path: "fetch-data",
        component: FetchDataComponent,
        canActivate: [AuthorizeGuard],
      }
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: "Tech RSS Reader DevTools",
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar as IconDefinition);
    library.addIcons(falStar as IconDefinition);
    library.addIcons(farBookmark as IconDefinition);
    library.addIcons(fasBookmark as IconDefinition);
    library.addIcons(faNewspaper as IconDefinition);
  }
}
