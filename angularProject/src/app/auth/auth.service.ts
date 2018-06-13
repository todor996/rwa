import {Subject} from 'rxjs';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material';
import { UtilityService } from '../shared/utility.service';
@Injectable()
export class AuthService{
    private user: User;
    constructor(
        private router:Router,
        private fireAuth:AngularFireAuth,
        private exerciseService:ExerciseService,
        private utilityService:UtilityService){
    }
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
        this.utilityService.loadingStateChanged.next(true);
        this.fireAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
        .then(res=>{
            console.log(res);
            this.utilityService.loadingStateChanged.next(false);
        })
        .catch(error=>{
            this.utilityService.loadingStateChanged.next(false);
            this.utilityService.showSnackbar(error.message,null,3000)

        })
        
        }
    login(authData:AuthData){
        this.utilityService.loadingStateChanged.next(true);
        this.fireAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
            .then(res=>{
                console.log(res);
                this.utilityService.loadingStateChanged.next(false);
        
            })
            .catch(error=>{
                this.utilityService.loadingStateChanged.next(false);
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