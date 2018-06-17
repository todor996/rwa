import { Action,createFeatureSelector,createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import {TrainingActions,GET_AVAILABLE_TRAININGS,START_TRAINING,STOP_TRAINING,RATE,RATE_FAIL,RATE_SUCCESS} from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
/*export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining:Exercise;
}*/

const trainingAdapter=createEntityAdapter<Exercise>();
export interface State extends EntityState<Exercise>{

  activeTraining:Exercise|null,
  selectedId:string|null
}


const defaultState = {
  ids:[],
  entities:{},
  activeTraining:null,
  selectedId:null
};
export const initialState:State=trainingAdapter.getInitialState(defaultState);
export function trainingReducer(state:State = initialState, action: TrainingActions) {
  switch (action.type) {
    case GET_AVAILABLE_TRAININGS:
      
      return trainingAdapter.addAll(action.payload,state);
    
      case START_TRAINING:
      return { ...state, activeTraining:Object.values(state.entities).find(s=>s.id===action.payload) };  
      
      case STOP_TRAINING:
      return {...state,activeTraining:null}
      case RATE:
      return {...state,...action.payload,load:true};
      case RATE_SUCCESS:
      return {...state,load:false};
      case RATE_FAIL:
      return {...state,...action.payload,load:false};
    default: {
      return state;
    }
  }
}



export const getTrainingState=createFeatureSelector<State>('training');

export const {
selectAll,
selectIds,
selectEntities,
selectTotal
} =trainingAdapter.getSelectors(getTrainingState);  
export const getSelectedId=(state:State)=>state.selectedId;
export const selectPastTraining=createSelector(selectEntities,getSelectedId,(trainingEntity,trainingId)=> trainingEntity[trainingId])
//export const getAvailableExercises=createSelector(getTrainingState,(state: TrainingState)=>state.availableExercises);
export const getActiveTraining=createSelector(getTrainingState,(state:State)=>state.activeTraining);
export const getIsTraining=createSelector(getTrainingState,(state:State)=>state.activeTraining!=null);
