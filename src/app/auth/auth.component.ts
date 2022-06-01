import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  authForm: FormGroup;
  loginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
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
          console.log(error)
          this.error = 'Error: ' + error.error.error.message
          this.isLoading = false;
          // console.log(error)
          
        }
      })
  }


  clearForm() {
    this.authForm.reset()
    this.error = null;
  }

}
