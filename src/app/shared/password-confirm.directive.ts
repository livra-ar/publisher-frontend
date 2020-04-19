import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';

export const passwordConfirmValidator: ValidatorFn = (control: FormGroup): ValidationErrors| null => {
    const password = control.get('password');
    const confirm = control.get('confirm');
    return password && confirm 
      && password.value !== confirm.value ? {'unmatchingPasswords': true} : null;
}

