import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GuestGuard } from './guest.guard';

import { AuthService } from '@app/auth/auth.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

describe('GuestGuard', () => {
    let guard: GuestGuard;
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
        guard = TestBed.inject(GuestGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    describe('canActivate', ()=>{

        it('should return false, call getCurrentUser and call navigate with "\\dashboard" for a logged in user', () => {
            routerSpy.navigate.and.returnValue();    
            authServiceSpy.getCurrentUser.and.returnValue({});
            let next = {} as ActivatedRouteSnapshot;
            let state = { url: 'url'} as RouterStateSnapshot;
            expect(guard.canActivate(next, state)).toEqual(false);
            expect(authServiceSpy.getCurrentUser).toHaveBeenCalled();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
            
        });


        it('should return true for a logged out user', () => {
            routerSpy.navigate.and.returnValue();    
            authServiceSpy.getCurrentUser.and.returnValue(null);
            let next = {} as ActivatedRouteSnapshot;
            let state = { url: 'url'} as RouterStateSnapshot;
            expect(guard.canActivate(next, state)).toEqual(true);
            expect(authServiceSpy.getCurrentUser).toHaveBeenCalled();
            expect(routerSpy.navigate).not.toHaveBeenCalled();

        });

    });
});
