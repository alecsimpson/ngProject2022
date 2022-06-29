import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer'
import { take } from "rxjs/operators";
import { map } from "rxjs/operators";
import { AuthState } from "./store/auth.reducer";
import { User } from "./user.model";



@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private store: Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
          take(1),
          map((authState: AuthState) => {
            const user: User = authState.user;
            if(user && user.token) {
              return true;
            } else {
              return this.router.createUrlTree(['/auth'])
            }
          })
        )
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state)
    }
}
