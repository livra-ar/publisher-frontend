import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ISBNValidator } from '@app/shared/isbn.directive';
import { AuthService } from '@app/auth/auth.service';
import { BooksService } from '@app/services/books.service';
import { AlertService } from '@app/services/alert.service';
import { FileUploadComponent } from '@app/file-upload/file-upload.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  book;

  @ViewChild(FileUploadComponent)
  fileUpload: FileUploadComponent;


  fileError: boolean;
  maxFiles = 3;
  existingFiles= new BehaviorSubject(null);
  loading=true;
  saving=false;
  public  bookEditForm = this.fb.group({
    title: ['', Validators.required],
    isbn: [{
      value: 'ISBN',
      disabled: true
    }],
    author: ['', Validators.required],
    publisher: [{
      value: this.authService.currentUserName,
      disabled: true
    }]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private authService: AuthService,
    private booksService: BooksService,
    private alert: AlertService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.booksService.getById(params.get('id'));
      })
    ).subscribe(book => {
      this.book = book;
      this.bookEditForm.get('title').setValue(this.book.title);
      this.bookEditForm.get('author').setValue(this.book.authors.join(', '));
      this.bookEditForm.get('isbn').setValue(this.book.isbns.join(', '));
      this.bookEditForm.get('publisher').setValue(this.book.publisher.name);
      this.fileError = this.book.covers.length < 1;
      this.existingFiles.next(this.book.covers);
      this.loading = false;
    },
    error => {
      this.alert.showErrorAlert(
        'An error occurred while fetching book data. Please refresh the page.',
        'Error');
    });

  }


  get title(){
    return this.bookEditForm.get('title');
  }

  get isbn(){
    return this.bookEditForm.get('isbn');
  }

  get author(){
    return this.bookEditForm.get('author');
  }

  onFilesChange(files){
    if (files.length > 0){
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  onUploadComplete(files){
   this.booksService.updateBook({
      id: this.book.id,
      title: this.bookEditForm.get('title').value,
      authors: this.bookEditForm.get('author').value.split(','),
      isbns: this.book.isbns,
      covers: files
    }).subscribe(book => {
      this.saving = false;
      this.alert.showSuccessAlert(
        'Changes were successfully saved',
        'Update successful');
      this.router.navigate([`/books/${book.id}`]);
    },
    err => {
      this.saving = false;
      this.alert.showErrorAlert(
        'Please refresh the page and try again',
        'Error occured while updating');
    });
  }

  public onSubmit(){
    this.saving =true;
   this.fileUpload.saveChanges();
  }
}
