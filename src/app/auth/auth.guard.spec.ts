import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard'; 
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/auth/auth.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

class MockRouter{
  navigate(path){

  }
}

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authServiceSpy; 
    let routerSpy;    
    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'redirectUrl'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers : [
         {provide: Router, useValue: routerSpy},
                {provide: AuthService, useValue: authServiceSpy}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', ()=>{


   it('should return true for a logged in user', () => {
        routerSpy.navigate.and.returnValue();    
        authServiceSpy.getCurrentUser.and.returnValue({});
      let next = {} as ActivatedRouteSnapshot;
      let state = { url: 'url'} as RouterStateSnapshot;
      expect(guard.canActivate(next, state)).toEqual(true);
      expect(authServiceSpy.getCurrentUser).toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });


      it('should return false for a logged out user', () => {
        routerSpy.navigate.and.returnValue();    
        authServiceSpy.getCurrentUser.and.returnValue(null);
      let next = {} as ActivatedRouteSnapshot;
      let state = { url: 'url'} as RouterStateSnapshot;
      expect(guard.canActivate(next, state)).toEqual(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      expect(authServiceSpy.getCurrentUser).toHaveBeenCalled();
      expect(authServiceSpy.redirectUrl).toEqual(state.url);
    });

    });
});
