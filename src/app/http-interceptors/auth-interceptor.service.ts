import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';
import { DialogService } from '@app/services/dialog.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private alert: DialogService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        'Authorization': `Token ${token}`
      }
    })

    return next.handle(req).pipe(
      catchError(
        (err, caught)=> {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        })
    );
  }

  handleAuthError(){
    this.authService.logout();
    this.alert.showErrorAlert(
      'Please log in again',
      'Login Expired'
    )
    this.router.navigate(['/login'])
  }
}
