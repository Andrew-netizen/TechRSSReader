import { Injectable, EventEmitter } from "@angular/core";
import { TrainingService } from "../training.service";

/* NgRx */
import { Action } from "@ngrx/store";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import * as trainingActions from "./training.actions";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, tap, concatMap } from "rxjs/operators";
import {
  RssFeedItemDto,
  UpdateUserInterestedCommand,
} from "src/app/techrssreader-api";

@Injectable()
export class TrainingEffects {
  userInterestUpdated: EventEmitter<void>;

  constructor(
    private trainingService: TrainingService,
    private actions$: Actions
  ) {}

  @Effect()
  getTrainingItem$: Observable<Action> = this.actions$.pipe(
    ofType(trainingActions.TrainingActionTypes.GetTrainingItem),
    map((action: trainingActions.GetTrainingItem) => action.payload),
    mergeMap((blogId: number) =>
      this.trainingService.getTrainingFeedItem(blogId).pipe(
        map(
          (rssFeedItem) =>
            new trainingActions.GetTrainingItemSuccess(rssFeedItem)
        ),
        catchError((error) =>
          of(new trainingActions.GetTrainingItemFail(error))
        )
      )
    )
  );

  getTrainingItemSuccess$ = createEffect( () => this.actions$.pipe(
    ofType(trainingActions.TrainingActionTypes.GetTrainingItemSuccess),
    tap((action: trainingActions.GetTrainingItemSuccess) =>
      {if (action.payload == null){alert("There are no articles to learn from in this feed")}})
    ),
    {dispatch: false}
  );


  updateUserInterest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingActions.TrainingActionTypes.UpdateUserInterest),
      map((action: trainingActions.UpdateUserInterest) => action.payload),
      mergeMap((command: UpdateUserInterestedCommand) =>
        this.trainingService.updateUserInterest(command).pipe(
          map(
            (nextRssFeedItem) =>
              new trainingActions.UpdateUserInterestSuccess(nextRssFeedItem)
          ),
          catchError((error) =>
            of(new trainingActions.UpdateUserInterestFail(error))
          )
        )
      )
    )
  );


  updateUserInterestSuccess$ = createEffect( () => this.actions$.pipe(
    ofType(trainingActions.TrainingActionTypes.UpdateUserInterestSuccess),
    tap((action: trainingActions.UpdateUserInterestSuccess) =>
      {if (action.payload == null){alert("There are no more articles to learn from in this feed")}})
    ),
    {dispatch: false}
  );

}
