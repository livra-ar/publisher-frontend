import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BooksModule } from '@app/books/books.module';
import { ContentModule } from '@app/content/content.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { PublisherModule } from '@app/publisher/publisher.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { FooterComponent } from '@app/footer/footer.component';
import { HeaderComponent } from '@app/header/header.component';
import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

import { AuthInterceptorService } from '@app/http-interceptors/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertDialog } from './shared/alert/alert.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CardListModule } from '@app/card-list/card-list.module';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AlertDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule,
    CardListModule,
    BooksModule,
    ContentModule,
    // PublisherModule,
    AppRoutingModule,
    // SweetAlert2Module.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
