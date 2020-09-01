import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookAddComponent } from './book-add.component';
import { BooksService } from '@app/services/books.service';
import { AuthService } from '@app/auth/auth.service'
import { DialogService} from '@app/services/dialog.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FileUploadComponent } from '@app/file-upload/file-upload.component';
import { MatDialogRef} from '@angular/material/dialog';
class MockAuthService {
  currentUserName = 'Current';
}



let alertService = jasmine.createSpyObj(DialogService, ['showSuccessAlert', 'showErrorAlert']);
let booksService = jasmine.createSpyObj(BooksService, ['addBook']);
 let router
let matDialogRefSpy = jasmine.createSpyObj(MatDialogRef, ['close']);
describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;

  beforeEach(async(() => {
    router = jasmine.createSpyObj(Router, ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ BookAddComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers : [
        {provide: AuthService, useClass: MockAuthService},
        {provide: BooksService, useValue: booksService},
        {provide: DialogService, useValue: alertService},
        {provide: Router, useValue: router},
        {provide:MatDialogRef, useValue: matDialogRefSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddComponent);
    component = fixture.componentInstance;
    component.ngOnInit();  
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
      expect(component.addBookForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
  let title = component.addBookForm.controls['title'];
  expect(title.valid).toBeFalsy();
});
  it('isbn field validity', () => {
  let isbn = component.addBookForm.controls['isbn'];
  expect(isbn.valid).toBeFalsy();
  });

  it('author field validity', () => {
  let author = component.addBookForm.controls['author'];
    expect(author.valid).toBeFalsy();
  });

    it('publisher field disabled', () => {
  let publisher = component.addBookForm.controls['publisher'];
    expect(publisher.disabled).toBeTruthy();
  });


      it('isbn detect invalid isbn', () => {
  let isbn = component.addBookForm.controls['isbn'];
  isbn.setValue('1234');
  expect(isbn.valid).toBeFalsy();
  });

            it('isbn detect valid isbn', () => {
  let isbn = component.addBookForm.controls['isbn'];
  isbn.setValue('978-3-16-148410-0');
  expect(isbn.valid).toBeTruthy();
  });

  it('shows alert and redirect after successful submission', ()=> {
    const isbns = ['978-3-16-148410-0'];
    const authors = ['Author'];
    const title = 'Title';
    const covers = ['url1'];
    const id ='id';
      component.addBookForm.controls['isbn'].setValue(isbns[0]);
      component.addBookForm.controls['author'].setValue(authors[0]);
      component.addBookForm.controls['title'].setValue(title);
      booksService.addBook.and.returnValue(of({id}));
      component.onUploadComplete(covers);
      
      expect(booksService.addBook).toHaveBeenCalledWith({
        title,
        isbns,
        authors,
        covers
      });

      expect(alertService.showSuccessAlert).toHaveBeenCalled();
       expect(router.navigate).toHaveBeenCalledWith([`books/${id}`]);
  });


    it('shows alert and does not redirect after failure submission', ()=> {
    const isbns = ['978-3-16-148410-0'];
    const authors = ['Author'];
    const title = 'Title';
    const covers = ['url1'];
    const id ='id';
      component.addBookForm.controls['isbn'].setValue(isbns[0]);
      component.addBookForm.controls['author'].setValue(authors[0]);
      component.addBookForm.controls['title'].setValue(title);
      booksService.addBook.and.returnValue(throwError({}));
      component.onUploadComplete(covers);
      
      expect(booksService.addBook).toHaveBeenCalledWith({
        title,
        isbns,
        authors,
        covers
      });

      expect(alertService.showErrorAlert).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled()
  })          
});
