
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
import * as Auth from './auth.actions';
@Injectable()
export class AuthService{
    constructor(
        private router:Router,
        private fireAuth:AngularFireAuth,
        private exerciseService:ExerciseService,
        private utilityService:UtilityService,
        private store:Store<fromRoot.State>)
{}

    initAuthListener(){
        this.fireAuth.authState.subscribe(user=>{
            if(user){
                
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);  
            }
            else{
                this.exerciseService.cancelSubscription();
       
                this.store.dispatch(new Auth.SetUnauthenticated())
                this.router.navigate(['/login']);
                
            }
        })
    }
    registerUser(authData: AuthData){
       // this.utilityService.loadingStateChanged.next(true);
       this.store.dispatch(new UI.StartLoading()); 
       this.fireAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
        .then(res=>{
            localStorage.setItem('user',authData.email);
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
                localStorage.setItem('user',authData.email);
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
            localStorage.removeItem('user');
        }
    
   

    }