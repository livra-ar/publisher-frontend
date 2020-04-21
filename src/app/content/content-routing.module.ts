import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentDetailComponent } from './content-detail/content-detail.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { ContentEditComponent } from './content-edit/content-edit.component';

import { AuthGuard } from '@app/auth/auth.guard';

const routes: Routes = [
  {path: 'content/edit/:id', component: ContentEditComponent, canActivate: [AuthGuard]},
  {path: 'content/add', component: ContentAddComponent, canActivate: [AuthGuard]},
  {path: 'content/:id', component: ContentDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
