import {map} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import * as fromRoot from '../../app.reducer';
import {Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  constructor(private exerciseService:ExerciseService,private store:Store<fromTraining.State>) { }
  exercises$:Observable<Exercise[]>;
  
  isLoading$:Observable<boolean>
    ngOnInit() {
    this.isLoading$=this.store.select(fromRoot.getIsLoading);
    this.exercises$=this.store.select(fromTraining.selectAll);
    console.log(this.exercises$);
    this.fetchExercises();

  }
  fetchExercises(){
    this.exerciseService.fetchAvailableExercises();

  }
  onStartTraining(form:NgForm){

  this.exerciseService.startExercise(form.value.exercise);
  }

}
