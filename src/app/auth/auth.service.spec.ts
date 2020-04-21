import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  let root_url = 'http://localhost:3000';
  let storeLoginSpy;

      const mockUserInfo = {
        'displayName': 'user',
        'token': 'token'
    }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
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
          expect(user.displayName).toEqual('user');
          expect(user.token).toEqual('token');
          expect(storeLoginSpy).toHaveBeenCalled();
      });
       
       const req = httpTestingController.expectOne(`${root_url}/user/login`);
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
       
      const req = httpTestingController.expectOne(`${root_url}/user/login`);
      expect(req.request.method).toEqual('POST');
      req.flush({'detail': 'Wrong password'}, {status:400, statusText: 'Invalid data'});
    });
  });

  describe('#register', () => {
    const mockRegisterInfo = {
      'email': 'user@example.com',
      'password': 'password',
      'displayName': 'user'
    }

    it('should login user if registration is successful', () => {
      service.register(mockRegisterInfo).subscribe(
        user => {
          expect(user.displayName).toEqual('user');
          expect(user.token).toEqual('token');
          expect(storeLoginSpy).toHaveBeenCalled();
      });
       
     const req = httpTestingController.expectOne(`${root_url}/user/register`);
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
       
       const req = httpTestingController.expectOne(`${root_url}/user/register`);
       expect(req.request.method).toEqual('POST');
       req.flush({'detail': 'Server Error'}, {status:500, statusText: 'Server Error'});
      });
  });


 describe('#emailExists', () => {

  it('should return true if email exists', () => {
    service.emailExists('user@example.com').subscribe(exists => expect(exists).toBeTrue());
     
    const req = httpTestingController.expectOne(`${root_url}/user/emails/user@example.com`);
    expect(req.request.method).toEqual('HEAD');
    req.flush({}, {status:200, statusText: 'Ok'});
  });


  it('should return false if email doesn\'t exist', () => {
    service.emailExists('notuser@example.com').subscribe(exists => expect(exists).toBeFalse());
   
    const req = httpTestingController.expectOne(`${root_url}/user/emails/notuser@example.com`);
    expect(req.request.method).toEqual('HEAD');
    req.flush({}, {status:404, statusText: 'Not Found'});
  });

 });

});


 