import { Action } from '@ngrx/store';
import {Exercise} from './exercise.model';

export const GET_AVAILABLE_TRAININGS = '[Training] Get Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING='[Training] Start Training';
export const STOP_TRAINING='[Training] Stop Training';
export const RATE= '[Training] Rate';
export const RATE_SUCCESS='[Training] Rate success';
export const RATE_FAIL='[Training] Rate fail';

export class GetAvailableTrainings implements Action {
  readonly type = GET_AVAILABLE_TRAININGS;

  constructor(public payload:Exercise[]){}
}

export class SetFinishedTrainings implements Action {
  readonly type= SET_FINISHED_TRAININGS;
  constructor(public payload:Exercise[]){}
}
export class StartTraining implements Action{
    readonly type=START_TRAINING;
    constructor(public payload:string){}
}
export class StopTraining implements Action{
    readonly type=STOP_TRAINING;
    
}
export class Rate implements Action {
  readonly type = RATE;
  constructor(public payload: {exercise:Exercise,val:number}) {}
}

export class RateSuccess implements Action {
  readonly type = RATE_SUCCESS;
  constructor(public payload?: any) {}
}

export class RateFail implements Action {
  readonly type = RATE_FAIL;
  constructor(public payload?: any) {}
}

export type TrainingActions = GetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining | Rate |RateFail |RateSuccess