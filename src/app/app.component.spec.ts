import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { of } from 'rxjs';

class MockAuthService{
  getCurrentUser(){
    return of({
      id: '12312312'
    })
  }
}
describe('AppComponent', () => {
  let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
  let routerSpy =  jasmine.createSpyObj('Router', ['navigate'])
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }, 
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Livra'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Livra');
  });

});
