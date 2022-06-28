import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/dataStorage.service';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/store/auth.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticatedState: boolean = false;
  authSub: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe((authState: AuthState) => {
      this.authenticatedState = !!authState.user;
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
