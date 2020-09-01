import { Injectable } from '@angular/core';
import { Observable, of,  BehaviorSubject } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigService} from '@app/services/config.service';

interface LoggedInUserInfo {
  name: string;
  token: string;
}

interface RegisterUserInfo{
  email: string,
  password: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;
  currentUser$ = new BehaviorSubject<LoggedInUserInfo>(null);
  loggedIn$ = new BehaviorSubject<boolean>(false);
  redirectUrl: string = '/dashboard';
  private token: string;
  private currentUser;
  private serverUrl = 'http://localhost:8000';

  constructor(
     private http: HttpClient,
     private config: ConfigService
  ) {
    this.loggedIn$.subscribe(value => this.isLoggedIn = value);
    this.serverUrl = config.serverUrl;
    this.currentUser$.next(this.getCurrentUser()); 
   }

  private _storeLogin(loggedInUser: LoggedInUserInfo){
     localStorage.setItem('user', JSON.stringify(loggedInUser));
     this.currentUser$.next(loggedInUser);
  }

  logout(): void{
    this.loggedIn$.next(false);
    this.currentUser$.next(null);
    localStorage.removeItem('user');
  }

  login(email:string, password: string): Observable<LoggedInUserInfo>{
    return this.http.post<LoggedInUserInfo>(`${this.serverUrl}/auth/`, {
      email,
      password
    }).pipe(
     tap(loggedInUser => {
      this._storeLogin(loggedInUser);
     })
    );
  }

  register(userInfo: RegisterUserInfo){
    return this.http.post<LoggedInUserInfo>(`${this.serverUrl}/user/`, userInfo).pipe(
     tap(loggedInUser => {
       // this._storeLogin(loggedInUser);
       return loggedInUser;
     })
    );
  }

  emailExists(email: string): Observable<boolean>{
    return this.http.head<any>(
      `${this.serverUrl}/user/emails/${email}/`, {'observe' : 'response'}
    ).pipe(
    catchError(err => of({status: err.status})),
     map(response => {
       return response.status === 200;
     })

    );
  }

  get isLoggedInObservable(){
    return this.loggedIn$.asObservable();
  }

  getToken():string{
    return this.getCurrentUser()?.token;
  }

  getCurrentUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  get currentUserName(){
    if (this.currentUser$.value){
      return this.currentUser$.value.name;
    }else{
      return null;
    }
  }


  requestForgotPassword(email){
    return this.http.post<any>(`${this.serverUrl}/user/forgot/token/`, {
      email
    });
  }

  checkForgotPasswordRequest(id, code){
    return this.http.get(`${this.serverUrl}/user/forgot/token/`, {
      params: {
        id,
        code
      },
      observe: 'response'
    }).pipe(
    catchError(err => of({status: err.status})),
     map(response => {
       return response.status === 200;
     })
    );
  }

  forgotPasswordChange(id, code, password){
        return this.http.post<any>(`${this.serverUrl}/user/forgot/change/`, {
        id,
        code,
        password
    });
  }
}
