import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './nav/header/header.component';
import { SidenavListComponent } from './nav/sidenav-list/sidenav-list.component';
import {AuthService} from './auth/auth.service'
import { ExerciseService } from './training/exercise.service';
import {environment} from '../environments/environment'
import { UtilityService } from './shared/utility.service';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService,ExerciseService,UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
