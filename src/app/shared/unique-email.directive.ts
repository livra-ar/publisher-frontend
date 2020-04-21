import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map,  catchError } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.emailExists(ctrl.value).pipe(
      map(exists => (exists ? { nonUniqueEmail: true } : null)),
      catchError(() => of(null))
    );
  }
}