import { Action,createFeatureSelector,createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import {TrainingActions,SET_FINISHED_TRAININGS} from './training.actions';
import { Exercise } from './exercise.model';



const trainingAdapter=createEntityAdapter<Exercise>();
export interface FinishedTrainingState extends EntityState<Exercise>{}



const defaultState = {
  ids:[],
  entities:{}
};
export const initialState:FinishedTrainingState=trainingAdapter.getInitialState(defaultState);
export function finishedTrainingReducer(state:FinishedTrainingState = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_FINISHED_TRAININGS:
      return trainingAdapter.addAll(action.payload,state);
     

    default: {
      return state;
    }
  }
}



export const getFinishedTrainingState=createFeatureSelector<FinishedTrainingState>('finishedTraining');

export const {
selectAll,
selectIds,
selectEntities,
selectTotal
} =trainingAdapter.getSelectors(getFinishedTrainingState);

