import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TrainingShellComponent } from "./containers/training-shell/training-shell.component";
import { TrainingItemComponent } from "./components/training-item/training-item.component";
import { TrainingService } from "./training.service";
import {BlogService} from '../shared/blog.service';

/* NgRx */
import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/training.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TrainingEffects } from "./state/training.effects";
import { ReactiveFormsModule } from "@angular/forms";

const trainingRoutes: Routes = [
  {
    path: "training",
    component: TrainingShellComponent,
    canActivate: [AuthorizeGuard],
  },
];

@NgModule({
  declarations: [
    TrainingShellComponent,
    TrainingItemComponent
  ],
  imports: [CommonModule, SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(trainingRoutes),
    StoreModule.forFeature("training", reducer),
    EffectsModule.forFeature([TrainingEffects]),
  ],
  providers: [BlogService, TrainingService],
})
export class TrainingModule {}
