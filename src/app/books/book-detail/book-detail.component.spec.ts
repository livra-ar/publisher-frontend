import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksRoutingModule } from '@app/books/books-routing.module';
import { BookDetailComponent } from './book-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '@app/shared/activated-route.stub';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from '@app/services/dialog.service';
import { AuthService } from '@app/auth/auth.service';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '@app/services/books.service';
import { ContentService } from '@app/services/content.service';

class MockContentService{
  getByBookId(id){
    return of([{
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
    }]);
  }
}

class MockBooksService{
  getById(id){
    return of({
    id: '12345678',
    title: 'Title',
    isbns: ['123456778'],
    authors: ['A. Author'],
    covers: ['http://localhost/a.jpg'],
    publisher : {
      'id': '12345678',
      'name': 'publisher'
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



describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
    let router = jasmine.createSpyObj('Router', ['navigate']);
  let dialogServiceSpy =  jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showConfirm', 'showSuccessAlert']);
  let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  let activatedRoute = new ActivatedRouteStub({id: '12322'});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailComponent ],
      imports: [BooksRoutingModule, RouterTestingModule],
      providers: [
      {
        provide: BooksService,
        useClass: MockBooksService
      },
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
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
