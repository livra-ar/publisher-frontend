import { Component, ViewChild } from '@angular/core';
import { fadeInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '@app/auth/auth.service';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { LoginComponent } from '@app/login/login.component.ts';
import { RegisterComponent } from '@app/register/register.component.ts';
import { BookAddComponent } from '@app/books/book-add/book-add.component';
import { ContentAddComponent } from '@app/content/content-add/content-add.component';
@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInAnimation
  ]
})
export class AppComponent {
  title = 'Livra';

  constructor(   private dialog: MatDialog,
    private authService: AuthService,
    private router: Router){

  }
  loggedIn;
  ngOnInit(){
    this.authService.getCurrentUser();
    this.loggedIn = this.authService.currentUser$.asObservable().pipe(
      map(user=> {
       return user !== null
      }));
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  @ViewChild(MatDrawer)
  drawer: MatDrawer ;

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '350px',
  width: '300px'
    });

  }


  openRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '380px',
  width: '500px'
    });

  }

    openAddBook() {
    const dialogRef = this.dialog.open(BookAddComponent, {
     height: '500px',
     width: '600px'
    });
  }

    openAddContent() {
    const dialogRef = this.dialog.open(ContentAddComponent, {
     height: '420px',
     width: '600px'
    });

  }
}
