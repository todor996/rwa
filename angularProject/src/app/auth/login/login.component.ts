import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UtilityService } from '../../shared/utility.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{
  loginForm: FormGroup;
  isLoading=false;
  private loadingSubs:Subscription;
  constructor(private authService: AuthService,private utilityService:UtilityService) {}

  ngOnInit() {
    this.loadingSubs=this.utilityService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password:this.loginForm.value.password
    })
  }
  ngOnDestroy(){
    if(this.loadingSubs)
    this.loadingSubs.unsubscribe();
  }
}
