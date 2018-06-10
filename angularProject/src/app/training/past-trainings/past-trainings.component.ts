import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource,MatSort, MatPaginator} from '@angular/material';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit {
  displayedColumns=['date','name','duration','calories','state'];
  dataSource=new MatTableDataSource<Exercise>();
  constructor(private exerciseService:ExerciseService) { }
@ViewChild(MatSort) sort:MatSort;
@ViewChild(MatPaginator) paginator:MatPaginator;
  ngOnInit() {
    this.dataSource.data=this.exerciseService.getCompletedOrCancelledExercises(); 
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filterValue:string){
      this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}
