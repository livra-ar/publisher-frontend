import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookEditComponent } from './book-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '@app/services/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BooksService } from '@app/services/books.service';
import { AuthService } from '@app/auth/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ActivatedRouteStub } from '@app/shared/activated-route.stub';
class MockAuthService {
  currentUserName = 'Current';
}

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let data = {book: {
    id: '12345678',
    title: 'Title',
    isbns: ['123456778'],
    authors: ['A. Author'],
    covers: ['http://localhost/a.jpg'],
    publisher : {
      'id': '12345678',
      'name': 'publisher'
    }
  }}
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let booksService = jasmine.createSpyObj('BooksService', ['updateBook']);
  let dialogRefSpy =   jasmine.createSpyObj('MatDialogRef', ['close']);
  let dialogServiceSpy =  jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showConfirm', 'showSuccessAlert']);
  let activatedRoute = new ActivatedRouteStub({id: '1234567'})
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditComponent ],
      imports: [
        /*RouterTestingModule, */
        ReactiveFormsModule, HttpClientTestingModule],
      providers : [
      {
        provide : MAT_DIALOG_DATA,
        useValue: data
      },
      {
        provide: MatDialogRef,
        useValue: dialogRefSpy
      },
      {
        provide: ActivatedRoute,
        useValue: activatedRoute
      },
      {
        provide: DialogService,
        useValue: dialogServiceSpy
      },
       {provide: AuthService, useClass: MockAuthService},
       {provide: BooksService, useValue: booksService},
       {provide: Router, useValue: router}
       ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
     component.ngOnInit();  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   it('form invalid at start', () => {
  //     expect(component.bookEditForm.valid).toBeTruthy();
  // });

  // it('title field validity initially', () => {
  // let title = component.bookEditForm.controls['title'];
  // expect(title.valid).toBeTruthy();
  // });


  // it('author field validity initially', () => {
  // let author = component.bookEditForm.controls['author'];
  //   expect(author.valid).toBeTruthy();
  // });

  //   it('publisher field disabled', () => {
  // let publisher = component.bookEditForm.controls['publisher'];
  //   expect(publisher.disabled).toBeTruthy();
  // });


  // it('isbn field disabled', () => {
  // let isbn = component.bookEditForm.controls['isbn'];
  // expect(isbn.disabled).toBeTruthy();
  // });


  // it('shows alert and redirect after successful submission', ()=> {
  //   const authors = ['Author'];
  //       const isbns = data.book.isbns; //['978-3-16-148410-0'];
  //   const title = 'Title';
  //   const covers = ['url1'];
  //   const id = data.book.id;
  //     component.bookEditForm.controls['author'].setValue(authors[0]);
  //     component.bookEditForm.controls['title'].setValue(title);
  //     component.bookEditForm.controls['isbn'].setValue(isbns[0]);
  //     booksService.updateBook.and.returnValue(of({id}));
  //     component.onUploadComplete(covers);
      
  //     expect(booksService.updateBook).toHaveBeenCalledWith({
  //       id,
  //       title,
  //       isbns,
  //       authors,
  //       covers
  //     });

  //     expect(dialogServiceSpy.showSuccessAlert).toHaveBeenCalled();
  //     expect(router.navigate).toHaveBeenCalledWith([`books/${id}`]);
  // });



  //   it('shows alert and does not redirect after failure submission', ()=> {
  //   const isbns = data.book.isbns//['978-3-16-148410-0'];
  //   const authors = ['Author'];
  //   const title = 'Title';
  //   const covers = ['url1'];
  //   const id = data.book.id;
  //     component.bookEditForm.controls['isbn'].setValue(isbns[0]);
  //     component.bookEditForm.controls['author'].setValue(authors[0]);
  //     component.bookEditForm.controls['title'].setValue(title);
  //     booksService.updateBook.and.returnValue(throwError({}));
  //     component.onUploadComplete(covers);
      
  //     expect(booksService.updateBook).toHaveBeenCalledWith({
  //       id,
  //       title,
  //       isbns,
  //       authors,
  //       covers
  //     });

  //     expect(dialogServiceSpy.showErrorAlert).toHaveBeenCalled();
  //     expect(router.navigate).not.toHaveBeenCalled()
  // })  
});
