import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  loginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  private closedSub: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy(): void {
    if (this.closedSub) {
      this.closedSub.unsubscribe()
    }
  }

  switchMode() {
    this.loginMode = !this.loginMode
    this.error = null;
    // this.clearForm()
  }

  onSubmit() {
      this.isLoading = true;
      let authObs: Observable<AuthResponse>

      if(this.loginMode) {
        authObs = this.authService.signIn(this.authForm.value)
      } else {
        authObs = this.authService.signUp(this.authForm.value)
      }
      
      authObs.subscribe(
      {
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/'])
        },  
        error: error => {
          // console.log(error)
          // this.error = 'Error: ' + error.error.error.message
          this.showErrorAlert(error.error.error.message)
          this.isLoading = false;          
        }
      })
  }


  clearForm() {
    this.authForm.reset()
    this.error = null;
  }


  private showErrorAlert(message: string) {
    this.alertHost.viewContainerRef.clear()
    const componentRef = this.alertHost.viewContainerRef.createComponent(AlertComponent)
    componentRef.instance.message = 'Error: ' + message;
    this.closedSub = componentRef.instance.closed.subscribe(() => { componentRef.destroy(); this.closedSub.unsubscribe() })
  }

}
