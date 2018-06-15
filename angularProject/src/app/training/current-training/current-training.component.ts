import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import { MatDialog } from '@angular/material';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import * as fromTraining from '../training.reducer';
import {StopTrainingComponent} from './stop-training.component';
import { ExerciseService } from '../exercise.service';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress=0;
  @Output() trainingExit = new EventEmitter();
  timer;

  constructor(private dialog:MatDialog,private exerciseService:ExerciseService,private store: Store<fromTraining.State>) { }

  ngOnInit() {
  this.startOrResumeTimer();
  }
  startOrResumeTimer(){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
      const step=ex.duration/100*1000;
      this.timer= setInterval(()=>{
        this.progress=this.progress+1; 
        if(this.progress>=100){
          this.exerciseService.completeExercise();
         clearInterval(this.timer);
        }
      
       },step)
    })
    
  }
  onStop(){
    clearInterval(this.timer);
    const dialogRef=this.dialog.open(StopTrainingComponent,{data:{
      progress:this.progress
    }});
    dialogRef.afterClosed().subscribe(result=>{
      if(result)
      this.exerciseService.cancelExercise(this.progress)
      else
      this.startOrResumeTimer();
    })
  }
}
