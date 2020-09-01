import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/auth/auth.guard';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { GuestGuard } from "@app/auth/guest.guard";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { ForgotPasswordChangeComponent } from '@app/forgot-password-change/forgot-password-change.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { PublisherUserGuideComponent } from './publisher-user-guide/publisher-user-guide.component';
import { MobileUserGuideComponent } from './mobile-user-guide/mobile-user-guide.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'user-guide', component: UserGuideComponent},
    {path: 'user-guide/publisher', component:PublisherUserGuideComponent },
    {path: 'user-guide/mobile', component: MobileUserGuideComponent},
  {path: 'forgot-change/:id/:code', component: ForgotPasswordChangeComponent, canActivate: [GuestGuard]},
  {path: '', component:HomeComponent, children: [
  	{path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  ]},
  {path: '**', component: PageNotFoundComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
