import { Exercise } from "./exercise.model";
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { UtilityService } from "../shared/utility.service";
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import {Store} from '@ngrx/store';
import * as Training from './training.actions';
import {take} from 'rxjs/operators';
import {UUID} from 'angular2-uuid';
@Injectable()
export class ExerciseService{
    constructor(private db:AngularFirestore ,private utilityService:UtilityService,private store:Store<fromTraining.State>){}

    private fbSubscriptions:Subscription[]=[];
    fetchAvailableExercises(){
        this.store.dispatch(new UI.StartLoading())
        this.fbSubscriptions.push(this.db
        .collection('Exercises')
        .snapshotChanges()
        .pipe(map(docArray=>{
        return docArray.map(doc=>{
            return{
            id:doc.payload.doc.id,
            name:doc.payload.doc.data()['name'],
            duration:doc.payload.doc.data()['duration'],
            calories:doc.payload.doc.data()['calories'],
            rating:doc.payload.doc.data()['rating']
            }
        })
    }))
    .subscribe((exercises:Exercise[])=>{
        this.store.dispatch(new UI.StopLoading());
        
        this.store.dispatch(new Training.GetAvailableTrainings(exercises));
    },error=>{
        this.store.dispatch(new UI.StartLoading())
    this.utilityService.showSnackbar('Fetching failed,try again later',null,3000);

}));
}
    startExercise(selectedId:string){
        this.store.dispatch(new Training.StartTraining(selectedId));
    }
     
    completeExercise(){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
            this.addExerciseToFirebase({
                ...ex,
                date:new Date(),
                state:'completed'});
                this.store.dispatch(new Training.StopTraining());
        })
        
          
    }

    cancelExercise(progress:number){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
        
            this.addExerciseToFirebase({
                ...ex,
                exerciseId:ex.id,
                id:UUID.UUID(),
                duration:ex.duration*(progress/100),
                calories:ex.calories*(progress/100),
                date:new Date(),
                state:'canceled'});
                this.store.dispatch(new Training.StopTraining());

        })
       
        }
    fetchCompletedOrCancelledExercises(){
        this.fbSubscriptions.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[])=>{
            console.log(exercises);
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));

        }));
    }

    private addExerciseToFirebase(exercise: Exercise){
        this.db.collection('finishedExercises').add(exercise)
    }
    cancelSubscription(){
        this.fbSubscriptions.forEach(sub=>sub.unsubscribe());
    }
   
}
