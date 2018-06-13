import { Exercise } from "./exercise.model";
import {map} from 'rxjs/operators';
import {Subject} from "rxjs";
import {Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { UtilityService } from "../shared/utility.service";
@Injectable()
export class ExerciseService{
    constructor(private db:AngularFirestore ,private utilityService:UtilityService){}
    exerciseChange=new Subject<Exercise>();
    exercisesChanged=new Subject<Exercise[]>();
    finishedExercisesChanged=new Subject<Exercise[]>();
    private availableExercises:Exercise[]=[];
    private runningExercise:Exercise;
    private fbSubscriptions:Subscription[]=[];
    fetchAvailableExercises(){
        this.fbSubscriptions.push(this.db
        .collection('Exercises')
        .snapshotChanges()
        .pipe(map(docArray=>{
        return docArray.map(doc=>{
            return{
            id:doc.payload.doc.id,
            name:doc.payload.doc.data()['name'],
            duration:doc.payload.doc.data()['duration'],
            calories:doc.payload.doc.data()['calories']
            }
        })
    }))
    .subscribe((exercises:Exercise[])=>{
        this.availableExercises=exercises;
        this.exercisesChanged.next([...this.availableExercises]);
    },error=>{
        this.utilityService.loadingStateChanged.next(false);
    this.utilityService.showSnackbar('Fetching failed,try again later',null,3000);
    this.exercisesChanged.next(null);

}))
}
    startExercise(selectedId:string){
    this.runningExercise=this.availableExercises.find(ex=>ex.id===selectedId);
    this.exerciseChange.next({...this.runningExercise});
    }
    getRunningExercise(){
        return {...this.runningExercise};
    }
    completeExercise(){
        this.addExerciseToFirebase({
            ...this.runningExercise,
            date:new Date(),
            state:'completed'});
        this.runningExercise=null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress:number){
        this.addExerciseToFirebase({
            ...this.runningExercise,
            duration:this.runningExercise.duration*(progress/100),
            calories:this.runningExercise.calories*(progress/100),
            date:new Date(),
            state:'canceled'});
        this.runningExercise=null;
        this.exerciseChange.next(null);
    }
    fetchCompletedOrCancelledExercises(){
        this.fbSubscriptions.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[])=>{
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    private addExerciseToFirebase(exercise: Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
    cancelSubscription(){
        this.fbSubscriptions.forEach(sub=>sub.unsubscribe());
    }
}
