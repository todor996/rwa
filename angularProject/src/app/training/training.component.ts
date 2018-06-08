import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import { ExerciseService } from './exercise.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining=false;
  exerciseSubscription:Subscription;
  constructor(private exerciseService:ExerciseService) { }
  
  ngOnInit() {
  this.exerciseSubscription=this.exerciseService.exerciseChange.subscribe(exercise=>{
    exercise?this.ongoingTraining=true:this.ongoingTraining=false;
  })
  }

}
