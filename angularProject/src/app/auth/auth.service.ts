import {Subject} from 'rxjs';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';
@Injectable()
export class AuthService{
    private user: User;
    constructor(private router:Router,private fireAuth:AngularFireAuth,private exerciseService:ExerciseService){
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
        this.fireAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err)
        })
        
        }
    login(authData:AuthData){
            this.fireAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
            .then(res=>{
                console.log(res);
        
            })
            .catch(err=>{
                console.log(err)
            })
         }
    logout(){
        
            this.fireAuth.auth.signOut();
        }
    
    isAuth(){
            return this.authenticated;
        }

    }