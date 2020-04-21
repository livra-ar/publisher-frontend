import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';

import { AuthGuard } from '@app/auth/auth.guard';


const routes: Routes = [
  {path: 'books/edit/:id', component: BookEditComponent, canActivate:[AuthGuard]},
  {path: 'books/add', component: BookAddComponent, canActivate:[AuthGuard]},
  {path: 'books/:id', component: BookDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
