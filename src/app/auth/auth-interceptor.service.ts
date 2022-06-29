import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from "../store/app.reducer";
import { take } from "rxjs/operators";
import { exhaustMap } from "rxjs/operators";
import { AuthState } from "./store/auth.reducer";
import { User } from "./user.model";
import { map } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
          take(1),
          map((authState: AuthState) => { return authState.user }),
          exhaustMap((user: User) => {
            if(!user) {
              return next.handle(req)
            } else {
              const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
              })
              return next.handle(modifiedReq)
            }
          })
        )
    }
}
