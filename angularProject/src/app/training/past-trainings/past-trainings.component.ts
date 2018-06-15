import { Component, OnInit ,ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MatTableDataSource,MatSort, MatPaginator} from '@angular/material';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit {
  displayedColumns=['date','name','duration','calories','state'];
  dataSource=new MatTableDataSource<Exercise>();
  constructor(private exerciseService:ExerciseService,private store:Store<fromTraining.State>) { }
@ViewChild(MatSort) sort:MatSort;
@ViewChild(MatPaginator) paginator:MatPaginator;
  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises:Exercise[])=>{
      this.dataSource.data=exercises;
    })

    this.exerciseService.fetchCompletedOrCancelledExercises(); 
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filterValue:string){
      this.dataSource.filter=filterValue.trim().toLowerCase();
  }
 
}
