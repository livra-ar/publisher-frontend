import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@app/auth/auth.service';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DialogService } from '@app/services/dialog.service';
import {MatDialogRef} from '@angular/material/dialog';
import { UniqueEmailValidator } from '@app/shared/unique-email.directive';
class AuthServiceMock{
  register(user){
    return user;
  }
}


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let alertServiceSpy = jasmine.createSpyObj('DialogService', ['showSuccessAlert', 'showErrorAlert']);
  let dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let emailValidatorSpy = jasmine.createSpyObj('UniqueEmailValidator', ['validate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock
        },
        {
          provide: DialogService,
          useValue: alertServiceSpy
        },
        {
          provide: UniqueEmailValidator,
          useValue: emailValidatorSpy
        },
        {
          provide: MatDialogRef,
          useValue: dialogRefSpy
        },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
