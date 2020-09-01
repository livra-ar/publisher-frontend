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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule ,MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule} from '@angular/material/grid-list';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CardListModule } from '@app/card-list/card-list.module';
import { HomeComponent } from './home/home.component';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordChangeComponent } from './forgot-password-change/forgot-password-change.component';
import { FullscreenSearchComponent } from './fullscreen-search/fullscreen-search.component';
import { MatChipsModule } from '@angular/material/chips';
import { MobileUserGuideComponent } from './mobile-user-guide/mobile-user-guide.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { PublisherUserGuideComponent } from './publisher-user-guide/publisher-user-guide.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    DialogComponent,
    HomeComponent,
    ForgotPasswordChangeComponent,
    FullscreenSearchComponent,
    MobileUserGuideComponent,
    UserGuideComponent,
    PublisherUserGuideComponent,
    AboutComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CardListModule,
    MatMenuModule,
    MatGridListModule,
    MatSidenavModule,
    MatChipsModule,
    BooksModule,
    ContentModule,
    FlexLayoutModule,
    // PublisherModule,
    AppRoutingModule,
    // SweetAlert2Module.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose:true}}
],
  bootstrap: [AppComponent],
})
export class AppModule { }
