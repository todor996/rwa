import {map} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import {Observable,Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import * as fromRoot from '../../app.reducer';
import {Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  constructor(private exerciseService:ExerciseService,private db:AngularFirestore,private store:Store<fromRoot.State>) { }
  exercises:Exercise[];
  exerciseSubscription:Subscription;
  isLoading$:Observable<boolean>
    ngOnInit() {
    this.isLoading$=this.store.select(fromRoot.getIsLoading);

    this.exerciseSubscription=this.exerciseService.exercisesChanged.subscribe(
      exercises=>{
        this.exercises=exercises
      
      });
      this.fetchExercises();

  }
  fetchExercises(){
    this.exerciseService.fetchAvailableExercises();

  }
  onStartTraining(form:NgForm){

  this.exerciseService.startExercise(form.value.exercise);
  }

}
