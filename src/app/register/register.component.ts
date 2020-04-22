import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective,NgForm } from '@angular/forms';
import { patternValidator } from '@app/shared/pattern.directive';
import { passwordConfirmValidator } from '@app/shared/password-confirm.directive';
import { UniqueEmailValidator } from '@app/shared/unique-email.directive';
import { VALIDATION } from '@app/shared/validation-constants.ts';
import { AuthService } from '@app/auth/auth.service';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // return !!
    const invalidCtrl = !!(control && control.invalid && (control.dirty || control.touched || isSubmitted ));
    const invalidParent = !!(form && form.errors?.unmatchingPasswords && (form.dirty || form.touched));

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private alert: AlertService,
    private fb:FormBuilder,
    private router: Router,
    private uniqueEmailValidator: UniqueEmailValidator
  ) { }

  matcher = new MyErrorStateMatcher();
  submitting = false;
  public registerForm: FormGroup = this.fb.group({
    displayName: ['', [Validators.required]],
    email: ['', {
		validators: [
                  Validators.required,
                  patternValidator(VALIDATION.emailRegex)
                ],
		asyncValidators: [this.uniqueEmailValidator],
		updateOn: 'blur'
		}
	],
    password: ['', [
                  Validators.required,
                  Validators.minLength(VALIDATION.minPasswordLength),
                  patternValidator(VALIDATION.passwordRegex)
              ]],
    confirm: ['', [Validators.required]]
    }, {
      validators: [passwordConfirmValidator],

    });

  ngOnInit(): void {

  }

  get displayName(){
    return this.registerForm.get('displayName');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get confirm(){
    return this.registerForm.get('confirm');
  }

  onSubmit(){
    this.submitting = true;
    this.authService.register({
      name: this.registerForm.get('displayName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    }).subscribe(
      user =>  {
        this.alert.showSuccessAlert('Registration successful. Please login',
        'Success').afterClosed().subscribe(()=>{
          this.router.navigate(['/login'])
        });
      },
      err => {
        this.submitting = false;
        this.alert.showErrorAlert(err.statusText, 'Error');

      }
    );
  }

}
