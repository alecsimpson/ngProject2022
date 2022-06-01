import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticatedState: boolean = false;
  authSub: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void { 
    this.authSub = this.authService.user.subscribe((user: User) => {
      this.authenticatedState = !!user;
    })
    this.authService.autoLogin()
  }

  onSave() {
    this.dataService.storeData()
  }

  onFetch() {
    this.dataService.fetchData()
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

}
