import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store"

import { User } from "./user.model";
import { AppState } from "../store/app.reducer";
import * as authActions from './store/auth.actions';


export interface AuthResponse {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthService {
    private apiKey: string = environment.firebaseAPIKey;
    authToken: string = null;
    user = new Subject<User>();
    private tokenExpirationTimer: any;


    constructor(private store: Store<AppState>, private http: HttpClient, private router: Router) {}

    signUp(credentials: { email: string, password: string }) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey, { ...credentials, returnSecureToken: true})
            .pipe(
                tap((res) => {
                    this.handleAuthentication(res)
                })
                // catchError(this.handleError)
            )
    }

    signIn(credentials: { email: string, password: string }) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey, { ...credentials, returnSecureToken: true})
            .pipe(
                tap((res) => {
                    this.handleAuthentication(res)
                }),
                // catchError(this.handleError)
            )
    }

    logout() {
        console.log('logging out')
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.authToken = null;
        this.store.dispatch(new authActions.Logout())
        this.router.navigate(['/auth'])
    }

    isAuthenticated(): boolean { return !!this.authToken }

    private handleAuthentication(event: AuthResponse) {
        this.authToken = event.idToken;
        let expirationDate = new Date(new Date().getTime() + (+event.expiresIn * 1000))
        const user = new User(event.email, event.localId, event.idToken, expirationDate)
        this.autoLogout((+event.expiresIn * 1000))
        this.store.dispatch(new authActions.Login(user))
    }

    autoLogin() {
        const userData: {email:string, id:string, _token:string, tokenExpirationDate:string} = JSON.parse(localStorage.getItem('userData'))
        if(!userData) { return }

        const expDate = new Date(userData.tokenExpirationDate)
        const loadedUser = new User(userData.email, userData.id, userData._token, expDate)
        if(loadedUser.token) {
            this.autoLogout(new Date(userData.tokenExpirationDate).getTime() - new Date().getTime())
            this.authToken = loadedUser.token
            this.store.dispatch(new authActions.Login(loadedUser))
        }
    }

    autoLogout(duration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), duration)
    }



    // private handleError(err: any) {
    //     let errorMessage: string;
    //     if (err.error instanceof ErrorEvent) {
    //         errorMessage = `An error occurred: ${err.error.message}`;
    //     } else {
    //         errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    //     }
    //     console.error(err);
    //     return throwError(errorMessage);
    // }
}
