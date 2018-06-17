import { Injectable }                 from '@angular/core';
import { Effect, Actions }            from '@ngrx/effects';
import { AngularFirestore }        from 'angularfire2/firestore';

import { Observable }                 from 'rxjs/Observable';
import { of }                         from 'rxjs/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import * as trainingService from './exercise.service';
import * as trainingActions from './training.actions';
import { catchError } from 'rxjs/operators';
import { updateClassProp } from '@angular/core/src/render3/styling';
export type Action = trainingActions.TrainingActions;


@Injectable()
export class TrainingEffect {

  constructor(private actions: Actions, private db: AngularFirestore) {}
  @Effect()
  rate: Observable<Action> = this.actions.ofType(trainingActions.RATE)
    .map((action: trainingActions.Rate) => action.payload )
    
    .mergeMap(payload => of(this.db.collection('Exercises').doc(payload.exercise.exerciseId)
    .update({rating:payload.exercise.rating+payload.val}))   
    .map(() => new trainingActions.RateSuccess())
    .catch(err => of (new trainingActions.RateFail( { error: err.message } )) ))
}

