import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { DialogService } from '@app/services/dialog.service';
import {MatDialogRef} from '@angular/material/dialog';
import { of } from 'rxjs';

class MockAuthService{
  login(){
    of({});
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let alertServiceSpy = jasmine.createSpyObj('DialogService', ['showErrorAlert'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogRefSpy
        },
        {
          provide: DialogService,
          useValue: alertServiceSpy
        },
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login at first', ()=>{
    expect(component.reset).toBeFalse();
  });
});
