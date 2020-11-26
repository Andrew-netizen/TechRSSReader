import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Fontawesome imports
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HomeLoggedoutComponent} from "./home/home-loggedout/home-loggedout.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { ApiAuthorizationModule } from "src/api-authorization/api-authorization.module";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { AuthorizeInterceptor } from "src/api-authorization/authorize.interceptor";

import { BlogModule } from "./blog/blog.module";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { ArticlesModule } from "./articles/articles.module";
import { TrainingService } from "./training/training.service";
import { DashboardModule} from "./dashboard/dashboard.module";

/* NgRx */
import { StoreModule, MetaReducer, ActionReducerMap } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { storeFreeze } from "ngrx-store-freeze";
import { State } from "./state/app.state";
import * as articlesReducer from './articles/state/articles.reducer';
import * as blogReducer from "./blog/state/blog.reducer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


export const reducers: ActionReducerMap<State> = {
  // reducers
  articles: articlesReducer.reducer,
  blogs: blogReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLoggedoutComponent,
    CounterComponent,
    FetchDataComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    DashboardModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BlogModule,
    SharedModule,
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
    NgbModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    TrainingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}

