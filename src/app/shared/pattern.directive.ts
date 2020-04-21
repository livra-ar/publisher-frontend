import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternValidator(regex: RegExp):ValidatorFn{
  return (control: AbstractControl) : {[key: string]: any} | null => {
    const allowed = regex.test(control.value);
    return allowed ? null: {'invalidPattern': {value: control.value}};
  }
}
