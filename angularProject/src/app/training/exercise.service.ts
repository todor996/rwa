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
    getAvailableExercises(){
        return this.availableExercises.slice();
    }
    startExercise(selectedId:string){

    this.runningExercise=this.availableExercises.find(ex=>ex.id===selectedId);
    this.exerciseChange.next({...this.runningExercise});
    }
}