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
  UpdateFeedItemCommand,
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

  getTrainingItemSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(trainingActions.TrainingActionTypes.GetTrainingItemSuccess),
        tap((action: trainingActions.GetTrainingItemSuccess) => {
          if (action.payload == null) {
            alert("There are no articles to learn from in this feed");
          }
        })
      ),
    { dispatch: false }
  );

  updateUserInterest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingActions.TrainingActionTypes.UpdateUserInterest),
      map((action: trainingActions.UpdateUserInterest) => action.payload),
      mergeMap((command: UpdateFeedItemCommand) =>
        this.trainingService.updateUserInterest(command).pipe(
          map(
            (rssFeedItem) =>
              new trainingActions.UpdateUserInterestSuccess(rssFeedItem)
          ),
          catchError((error) =>
            of(new trainingActions.UpdateUserInterestFail(error))
          )
        )
      )
    )
  );

  // Updating a feed Item and indicating whether the user is interested or not
  // leads to getting a new item to train.
  @Effect()
  updateUserInterestSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(trainingActions.TrainingActionTypes.UpdateUserInterestSuccess),
    map((action: trainingActions.UpdateUserInterestSuccess) => action.payload),
    mergeMap((previousfeedItem: RssFeedItemDto) =>
      this.trainingService.getTrainingFeedItem(previousfeedItem.blogId).pipe(
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
}
