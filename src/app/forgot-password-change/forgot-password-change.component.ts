import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { DialogService } from '@app/services/dialog.service';
import { patternValidator } from '../shared/pattern.directive';
import { VALIDATION } from '@app/shared/validation-constants';
import { passwordConfirmValidator } from '@app/shared/password-confirm.directive';
import { of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';
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
  selector: 'app-forgot-password-change',
  templateUrl: './forgot-password-change.component.html',
  styleUrls: ['./forgot-password-change.component.scss']
})
export class ForgotPasswordChangeComponent implements OnInit {

  constructor(
  	private authService: AuthService,
  	private dialog: DialogService,
  	private fb:FormBuilder,
  	private route: ActivatedRoute
  ) { }

  submitting = false;
  id;
  code;
  valid;
  matcher = new MyErrorStateMatcher();
  pwdForm = this.fb.group({
  
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
  	 this.route.paramMap.subscribe((params: ParamMap) => {
       	this.id = params.get('id');
 		this.code = params.get('code');
 		this.authService.checkForgotPasswordRequest(this.id, this.code).subscribe(value => this.valid = value);
    });
  }


  get password(){
    return this.pwdForm.get('password');
  }

  get confirm(){
    return this.pwdForm.get('confirm');
  }
  onSubmit(){
  	this.authService.forgotPasswordChange(this.id, this.code, this.password.value).subscribe(
  		success => {
  			this.dialog.showSuccessAlert('Successfully Changed!');
  		},
  		err =>{
  			this.dialog.showErrorAlert('Password change unsuccessful');
  		}
  	)

  }
}
