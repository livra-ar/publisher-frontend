import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { GuestGuard } from "@app/auth/guest.guard";
import { AuthGuard } from '@app/auth/auth.guard';
const routes: Routes = [
  {path: 'login', component: LoginComponent, data : {title: 'Login'}, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
