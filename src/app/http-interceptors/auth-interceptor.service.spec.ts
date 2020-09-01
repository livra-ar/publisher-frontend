import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogService } from '@app/services/dialog.service';
import { AuthService } from '@app/auth/auth.service';
import { ContentService } from '@app/services/content.service';
import { ConfigService } from '@app/services/config.service';
import { Router } from '@angular/router';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let httpMock: HttpTestingController;
  let contentService;
  let configService;
  let authSpy;
  let routerSpy;
  let dialogSpy;
  beforeEach(() => {

    dialogSpy = jasmine.createSpyObj('DialogService', ['showErrorAlert']);
    authSpy = jasmine.createSpyObj('AuthService', ['getToken', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
      ContentService,
      ConfigService,
      {
        provide: Router,
        useValue: routerSpy
      }, {
        provide: DialogService,
        useValue: dialogSpy
      }, {
        provide: AuthService,
        useValue: authSpy
      },{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi:true
      }]
    });
    service = TestBed.inject(AuthInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    contentService = TestBed.inject(ContentService);
    configService = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', () => {
   authSpy.getToken.and.returnValue('abcdefg');
     contentService.getUsersContent().subscribe(response => {
    expect(response).toBeTruthy();
  });
  
  const httpRequest = httpMock.expectOne(`${configService.serverUrl}/creator/content`);
  expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  expect(httpRequest.request.headers.get('Authorization')).toBe(
  'Token abcdefg',
);
});


    it('should logout, show alert and navigate to login page if auth token is invalid', () => {
     authSpy.getToken.and.returnValue('abcdefg');
     contentService.getUsersContent().subscribe(response => {
      
  });
  
  const httpRequest = httpMock.expectOne(`${configService.serverUrl}/creator/content`);
  httpRequest.flush({}, {status:401, statusText: 'Auth Error'});
  expect(authSpy.logout).toHaveBeenCalled();
  expect(dialogSpy.showErrorAlert).toHaveBeenCalled();
  expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
});
});

