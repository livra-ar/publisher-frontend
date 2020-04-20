import * as isISBN from 'is-isbn';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ISBNValidator():ValidatorFn{
  return (control: AbstractControl) : {[key: string]: any} | null => {
    const valid = isISBN.validate(control.value.replace(/-/g,''));
    return valid ? null: { invalidISBN: true };
  }
}
