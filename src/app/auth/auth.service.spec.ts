import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ConfigService } from '../services/config.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  let configService: ConfigService;
  let root_url = 'http://localhost:3000';
  let storeLoginSpy;

      const mockUserInfo = {
        'name': 'user',
        'token': 'token'
    }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, ConfigService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    configService = TestBed.inject(ConfigService);
    root_url = configService.serverUrl;
    httpTestingController = TestBed.inject(HttpTestingController);
    storeLoginSpy = spyOn<any>(service, '_storeLogin');
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('user');  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return a correct observable matching the data, save data in local storage & update currentUser$ variable', () => {
      service.login('user@example.com', '12345').subscribe(
        user => {
          expect(user.name).toEqual('user');
          expect(user.token).toEqual('token');
          expect(storeLoginSpy).toHaveBeenCalled();
      });
       
       const req = httpTestingController.expectOne(`${root_url}/auth/`);
       expect(req.request.method).toEqual('POST');
       req.flush(mockUserInfo);
    });


    it('should not return a user observable, save data in local storage or update currentUser$ if the server returned an error', () => {
      service.login('user@example.com', '12345').subscribe(
        user => {
         
        },
        error=>{
          expect(storeLoginSpy).not.toHaveBeenCalled();
          expect(error.error).toEqual({'detail': 'Wrong password'})
        });
       
      const req = httpTestingController.expectOne(`${root_url}/auth/`);
      expect(req.request.method).toEqual('POST');
      req.flush({'detail': 'Wrong password'}, {status:400, statusText: 'Invalid data'});
    });
  });

  describe('#register', () => {
    const mockRegisterInfo = {
      'email': 'user@example.com',
      'password': 'password',
      'name': 'user'
    }

    it('should login user if registration is successful', () => {
      service.register(mockRegisterInfo).subscribe(
        user => {
          expect(user.name).toEqual('user');
          expect(user.token).toEqual('token');
          //expect(storeLoginSpy).toHaveBeenCalled();
      });
       
     const req = httpTestingController.expectOne(`${root_url}/user/`);
     expect(req.request.method).toEqual('POST');
     req.flush(mockUserInfo);
    });

    it('should not login the user if the server returned an error', () => {
      service.register(mockRegisterInfo).subscribe(
        user => {
         
        },
        error=>{
          expect(storeLoginSpy).not.toHaveBeenCalled();
          expect(error.error).toEqual({'detail': 'Server Error'})
       });
       
       const req = httpTestingController.expectOne(`${root_url}/user/`);
       expect(req.request.method).toEqual('POST');
       req.flush({'detail': 'Server Error'}, {status:500, statusText: 'Server Error'});
      });
  });


 describe('#emailExists', () => {

  it('should return true if email exists', () => {
    service.emailExists('user@example.com').subscribe(exists => expect(exists).toBeTrue());
     
    const req = httpTestingController.expectOne(`${root_url}/user/emails/user@example.com/`);
    expect(req.request.method).toEqual('HEAD');
    req.flush({}, {status:200, statusText: 'Ok'});
  });


  it('should return false if email doesn\'t exist or error occurs', () => {
    service.emailExists('notuser@example.com').subscribe(exists =>{
      expect(exists).toBeFalse();
    }, err=> fail('Shouldn\'t execute')); 
    const req = httpTestingController.expectOne(`${root_url}/user/emails/notuser@example.com/`);
    req.flush({}, {status:404, statusText: 'Not Found'});
    expect(req.request.method).toEqual('HEAD');




  });

 });


 describe('#requestForgotPassword', ()=> {
   it('should send a post request to the correct endpoint', () => {
    service.requestForgotPassword('a@b.com').subscribe();
    const req = httpTestingController.expectOne(`${root_url}/user/forgot/token/`);
    req.flush({});
    expect(req.request.method).toEqual('POST');
   });
 })

  describe('#checkForgotPasswordRequest', ()=> {
    it('should send a get request to the correct endpoint and return true if exists', () => {
      service.checkForgotPasswordRequest('1234', '1234').subscribe(exists => expect(exists).toBeTrue());
      const req = httpTestingController.expectOne(`${root_url}/user/forgot/token/?id=1234&code=1234`);
      req.flush({});
      expect(req.request.method).toEqual('GET');
   });


        it('should send a get request to the correct endpoint and return false if not exists', () => {
      service.checkForgotPasswordRequest('1234', '1234').subscribe(exists => expect(exists).toBeFalse());
      const req = httpTestingController.expectOne(`${root_url}/user/forgot/token/?id=1234&code=1234`);
      req.flush({}, {status:404, statusText:'Not Found'});
      expect(req.request.method).toEqual('GET');
   });
  });

   describe('#forgotPasswordChange', ()=> {
   it('should send a post request to the correct endpoint', () => {
        service.forgotPasswordChange('1234','124','password').subscribe();
      const req = httpTestingController.expectOne(`${root_url}/user/forgot/change/`);
      req.flush({});
      expect(req.request.method).toEqual('POST');
   });

 });


});


 