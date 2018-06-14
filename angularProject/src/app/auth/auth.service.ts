import {Subject} from 'rxjs';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material';
import { UtilityService } from '../shared/utility.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService{
    constructor(
        private router:Router,
        private fireAuth:AngularFireAuth,
        private exerciseService:ExerciseService,
        private utilityService:UtilityService,
        private store:Store<fromRoot.State>)
{}
    authChange=new Subject<boolean>();
    private authenticated=false;
    initAuthListener(){
        this.fireAuth.authState.subscribe(user=>{
            if(user){
                this.authenticated=true;
                this.authChange.next(true);
                this.router.navigate(['/training']);  
            }
            else{
                this.exerciseService.cancelSubscription();
       
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.authenticated=false;
            }
        })
    }
    registerUser(authData: AuthData){
       // this.utilityService.loadingStateChanged.next(true);
       this.store.dispatch(new UI.StartLoading()); 
       this.fireAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
        .then(res=>{
            console.log(res);
            this.store.dispatch(new UI.StopLoading()); 

        })
        .catch(error=>{
            this.store.dispatch(new UI.StopLoading()) 

            this.utilityService.showSnackbar(error.message,null,3000)

        })
        
        }
    login(authData:AuthData){
        this.store.dispatch(new UI.StartLoading()) 
        this.fireAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
            .then(res=>{
                console.log(res);
                this.store.dispatch(new UI.StopLoading()) 
        
            })
            .catch(error=>{
                this.store.dispatch(new UI.StopLoading()) 
                this.utilityService.showSnackbar(error.message,null,3000)
            })
        }
    logout(){
        
            this.fireAuth.auth.signOut();
        }
    
    isAuth(){
            return this.authenticated;
        }

    }