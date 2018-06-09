import { Component,OnDestroy, OnInit,EventEmitter,Output} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() sidenavToggle=new EventEmitter<void>()
  constructor(private authService:AuthService) { }
  isAuth:boolean;
  authSubscription: Subscription;
  ngOnInit() {
    this.authSubscription=this.authService.authChange.subscribe(status=>{
    this.isAuth=status;
    })
  }
  onToggleSidenav(){
  this.sidenavToggle.emit();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
