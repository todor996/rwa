import {Subject} from 'rxjs';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService{
    private user: User;
    constructor(private router:Router,private fireAuth:AngularFireAuth){
    }
    authChange=new Subject<boolean>();
    private authenticated=false;
    registerUser(authData: AuthData){
        this.fireAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
        .then(res=>{
            console.log(res);
            this.authSuccesfully();
        })
        .catch(err=>{
            console.log(err)
        })
        
        }
    login(authData:AuthData){
            this.fireAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
            .then(res=>{
                console.log(res);
                this.authSuccesfully();
            })
            .catch(err=>{
                console.log(err)
            })
         }
    logout(){
            this.authChange.next(false);
            this.router.navigate(['/login']);
            this.authenticated=false;
        }
    
    isAuth(){
            return this.authenticated;
        }
    authSuccesfully(){
        this.authenticated=true;
            this.authChange.next(true);
       this.router.navigate(['/training']);
        }
    }