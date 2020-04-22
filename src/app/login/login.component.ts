import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { patternValidator } from '../shared/pattern.directive';
import { VALIDATION } from '@app/shared/validation-constants';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public error: string;
  public loginForm = this.fb.group({
    email: ['', [
                  Validators.required,
                  patternValidator(VALIDATION.emailRegex)
                ]],
    password: ['', [
                  Validators.required,
                  Validators.minLength(VALIDATION.minPasswordLength),
                  patternValidator(VALIDATION.passwordRegex)
              ]]
  })

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router: Router,
              public alert: AlertService
              ) {
               }
  submitting = false;
  ngOnInit(){

  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    this,this.submitting = true;
    this.authService.login(this.email.value, this.password.value).subscribe(
      user => this.router.navigate([this.authService.redirectUrl]),
      err => {
        this.submitting = false;
        this.alert.showErrorAlert(err.error.non_field_errors || err.statusText,'Could not login');
      }
    );
  }
}
