import { Component, OnInit ,ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MatTableDataSource,MatSort, MatPaginator} from '@angular/material';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { DatePipe } from '@angular/common';
import * as Training from '../training.actions';
import * as fromFinishedTraining from '../finishedTraining.reducer';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit {
  displayedColumns=['date','name','duration','calories','state','rating'];
  dataSource=new MatTableDataSource<Exercise>();
  constructor(private exerciseService:ExerciseService,private store:Store<fromTraining.State>) { }
@ViewChild(MatSort) sort:MatSort;
@ViewChild(MatPaginator) paginator:MatPaginator;
  ngOnInit() {
    this.exerciseService.fetchCompletedOrCancelledExercises(); 
    this.store.select(fromFinishedTraining.selectAll).subscribe((exercises:Exercise[])=>{
  
      this.dataSource.data=exercises;
    })

    
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filterValue:string){
      this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  rate(exercise:Exercise,val:number){
    console.log(exercise);
    this.store.dispatch(new Training.Rate({exercise,val}));
  }

}
