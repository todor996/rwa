import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UtilityService } from '../../shared/utility.service';
import { Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  maxDate;
  isLoading$: Observable<boolean>;
  constructor(
    private authService:AuthService,
    private utilityService:UtilityService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.isLoading$=this.store.select(fromRoot.getIsLoading);

    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }
  onSubmit(form: NgForm){
  
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    })
  }
  
}
