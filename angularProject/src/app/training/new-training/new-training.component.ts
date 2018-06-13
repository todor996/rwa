import {map} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import {Observable,Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  constructor(private exerciseService:ExerciseService,private db:AngularFirestore) { }
  exercises:Exercise[];
  exerciseSubscription:Subscription;
  isLoading=true;
  ngOnInit() {
    this.exerciseSubscription=this.exerciseService.exercisesChanged.subscribe(
      exercises=>{
        this.exercises=exercises
      this.isLoading=false;
      });
      this.fetchExercises();

  }
  fetchExercises(){
    this.exerciseService.fetchAvailableExercises();

  }
  onStartTraining(form:NgForm){

  this.exerciseService.startExercise(form.value.exercise);
  }
 ngOnDestroy(){
   if(this.exerciseSubscription)
   this.exerciseSubscription.unsubscribe();
  
  }
}
