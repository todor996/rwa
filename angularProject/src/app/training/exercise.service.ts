import { Exercise } from "./exercise.model";
import {map} from 'rxjs/operators';
import {Subject} from "rxjs";
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
@Injectable()
export class ExerciseService{
    constructor(private db:AngularFirestore){}
    exerciseChange=new Subject<Exercise>();
    exercisesChanged=new Subject<Exercise[]>();
    private availableExercises:Exercise[]=[];
    private runningExercise:Exercise;
    private exercises:Exercise[]=[];
    fetchAvailableExercises(){
    this.db
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
    })
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
            console.log(this.exercises);
        this.runningExercise=null;
        this.exerciseChange.next(null);
    }
    getCompletedOrCancelledExercises(){
        return this.exercises.slice();
    }

    private addExerciseToFirebase(exercise: Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}