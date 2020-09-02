import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { DialogService } from '@app/services/dialog.service';
import {MatDialogRef} from '@angular/material/dialog';
import { patternValidator } from '../shared/pattern.directive';
import { VALIDATION } from '@app/shared/validation-constants';

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

  public resetForm = this.fb.group({
    reset_email: ['', [
    Validators.required,
    patternValidator(VALIDATION.emailRegex)
    ]]
  })
  public reset = false;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router: Router,
              public alert: DialogService,
              private dialogRef:MatDialogRef<LoginComponent>
              ) {
               }
  submitting = false;
  resetSubmitting = false;
  ngOnInit(){

  }

   closeModal(){
      this.dialogRef.close();
  }


  showReset(){
    this.reset = true;
  }

  showLogin(){
    this.reset = false;
  }

  get reset_email(){
    return this.resetForm.get('reset_email');
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onResetSubmit(){
    this.resetSubmitting = true;
    this.authService.requestForgotPassword(this.reset_email.value).subscribe(done => {
      this.resetSubmitting = false;
      this.alert.showSuccessAlert('You will receive a password reset link if the email is valid', 'Success');
      this.email.setValue('');
    });
   
  }
  showForgot= false;

  onSubmit(){
    this.submitting = true;
    this.authService.login(this.email.value, this.password.value).subscribe(
      user => {
        this.dialogRef.close();
        this.router.navigate([this.authService.redirectUrl])
      },
      err => {
        this.submitting = false;
        this.showForgot = true;
        this.alert.showErrorAlert(err.error.non_field_errors || err.statusText,'Could not login');
      }
    );
  }
}
