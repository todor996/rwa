import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  constructor(private exerciseService:ExerciseService) { }
  exercises:Exercise[]=[];
  ngOnInit() {
    this.exercises=this.exerciseService.getAvailableExercises();
  }
  onStartTraining(form:NgForm){

  this.exerciseService.startExercise(form.value.exercise);
  }

}
