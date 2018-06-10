import { Exercise } from "./exercise.model";
import {Subject} from "rxjs";
export class ExerciseService{
    exerciseChange=new Subject<Exercise>();
    availableExercises:Exercise[]=[
    {id:'Suicide',name:'Suicide',duration:40,calories:30},
    {id:'Plank',name:'Plank',duration:30,calories:20},
    {id:'burpees',name:'burpees',duration:60,calories:5},
    {id:'Squats',name:'Squats',duration:60,calories:21}
    ];
    private runningExercise:Exercise;
    private exercises:Exercise[]=[];
    getAvailableExercises(){
        return this.availableExercises.slice();
    }
    startExercise(selectedId:string){

    this.runningExercise=this.availableExercises.find(ex=>ex.id===selectedId);
    this.exerciseChange.next({...this.runningExercise});
    }
    getRunningExercise(){
        return {...this.runningExercise};
    }
    completeExercise(){
        this.exercises.push({
            ...this.runningExercise,
            date:new Date(),
            state:'completed'});
        this.runningExercise=null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress:number){
        this.exercises.push({
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
}