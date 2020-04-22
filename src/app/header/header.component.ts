import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  loggedIn$:Observable<any>;

  ngOnInit(): void {
    this.loggedIn$ = this.authService.currentUser$.asObservable().pipe(
      map(user=> user !== null));

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
