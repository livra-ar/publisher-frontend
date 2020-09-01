import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailComponent } from './content-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ContentService } from '@app/services/content.service';
import { Router } from '@angular/router';
import { DialogService } from '@app/services/dialog.service';
import { AuthService } from '@app/auth/auth.service';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@app/shared/activated-route.stub';

class MockContentService{
  getById(id){
    return of({
      id: '12345678',
      title: 'Title',
      description: 'Description',
      images: ['http://localhost/a.jpg'],
      file: 'http://localhost/b.jpg',
      creator : {
        'id': '12345678',
        'name': 'publisher'
      }, 
      book: {
        'id':'123213',
        'title':'dasd'
      }
    });
  }
}

class MockAuthService{
   getCurrentUser(){
     return {
       id: '21321312',
       name: 'dasdsds'
     }
   } 
}
describe('ContentDetailComponent', () => {
  let component: ContentDetailComponent;
  let fixture: ComponentFixture<ContentDetailComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let dialogServiceSpy =  jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showConfirm', 'showSuccessAlert']);
  let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  let activatedRoute = new ActivatedRouteStub({id: '12322'});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailComponent ],
      imports: [RouterTestingModule],
      providers: [
      {
        provide: ContentService,
        useClass: MockContentService
      },
      {
        provide: Router,
        useValue: router
      },
      {
        provide: DialogService,
        useValue: dialogServiceSpy
      }, 
      {
        provide: MatDialog,
        useValue: matDialogSpy
      }, 
      {
        provide: AuthService,
        useClass: MockAuthService
      },{
        provide: ActivatedRoute,
        useValue: activatedRoute
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
