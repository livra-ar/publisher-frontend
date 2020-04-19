import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternValidator } from '@app/shared/pattern.directive';
import { passwordConfirmValidator } from '@app/shared/password-confirm.directive';
import { UniqueEmailValidator } from '@app/shared/unique-email.directive';
import { VALIDATION } from '@app/shared/validation-constants.ts';
import { AuthService } from '@app/auth/auth.service';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';
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

  public registerForm: FormGroup = this.fb.group({
    displayName: ['', [Validators.required]],
    email: ['', [
                  Validators.required,
                  patternValidator(VALIDATION.emailRegex)
                ], [
                 this.uniqueEmailValidator
                ] ],
    password: ['', [
                  Validators.required,
                  Validators.minLength(VALIDATION.minPasswordLength),
                  patternValidator(VALIDATION.passwordRegex)
              ]],
    confirm: ['', [Validators.required]]
    }, {
      validators: [passwordConfirmValidator],
      updateOn: 'blur'
    });

  ngOnInit(): void {

  }

  get displayName(){
    return this.registerForm.get('displayName').value;
  }

  get email(){
    return this.registerForm.get('email').value;
  }

  get password(){
    return this.registerForm.get('password').value;
  }

  get confirm(){
    return this.registerForm.get('confirm').value;
  }

  onSubmit(){
    this.authService.register({
      name: this.registerForm.get('displayName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    }).subscribe(
      user => this.router.navigate([this.authService.redirectUrl]),
      err => {
        this.alert.showErrorAlert(err.statusText, 'Error');
      
      }
    );
  }

}
