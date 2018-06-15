import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducer';
import { ExerciseService } from './exercise.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$:Observable<boolean>;
  constructor(private exerciseService:ExerciseService,private store:Store<fromTraining.State>) { }
  
  ngOnInit() {
  this.ongoingTraining$=this.store.select(fromTraining.getIsTraining);
  }

}
