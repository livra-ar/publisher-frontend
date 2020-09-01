import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ISBNValidator } from '@app/shared/isbn.directive';
import { AuthService } from '@app/auth/auth.service';
import { BooksService } from '@app/services/books.service';
import { DialogService } from '@app/services/dialog.service';
import { FileUploadComponent } from '@app/file-upload/file-upload.component';
import { BehaviorSubject } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BookEditComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private authService: AuthService,
    private booksService: BooksService,
    private alert: DialogService

  ) {

    this.book = data.book;
   }

  ngOnInit(): void {
  // this.booksService.getById(this.data.id).subscribe(book => {
      
      this.title.setValue(this.book.title);
      this.author.setValue(this.book.authors.join(', '));
      this.isbn.setValue(this.book.isbns.join(', '));
      this.publisher.setValue(this.book.publisher.name);
      this.fileError = this.book.covers.length < 1;
      this.existingFiles.next(this.book.covers);
      this.loading = false;
    // }
    // ,
    // error => {
    //   this.alert.showErrorAlert(
    //     'An error occurred while fetching book data. Please refresh the page.',
    //     'Error');
    // });

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

  get publisher(){
    return this.bookEditForm.get('publisher');

  }
  onFilesChange(files){
    if (files.length > 0){
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  onUploadComplete(files){
  
   let book  = {
      id: this.book.id,
      title: this.title.value,
      authors: this.author.value.split(','),
      isbns: this.book.isbns,
      covers: files
    };

   this.booksService.updateBook(book).subscribe(book => {
      this.saving = false;
      this.book.title =book.title;
      this.book.authors =book.authors;
      this.book.isbns = book.isbns;
      this.book.covers = book.covers;
      this.dialogRef.close();
      this.alert.showSuccessAlert(
        'Changes were successfully saved',
        'Update successful');
      this.router.navigate([`books/${book.id}`]);
    },
    err => {
      this.saving = false;
      this.alert.showErrorAlert(
        'Please refresh the page and try again',
        'Error occured while updating');
    });
  }


  closeModal(){
    if (this.saving)
    {
    this.alert.showConfirm(
      'Closing the form while submitting can cause unexpected behavior. Are you sure?',
      'Confirm'
    ).afterClosed().subscribe(
      value => {  

        if (value){
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  public onSubmit(){
    this.saving =true;
   this.fileUpload.saveChanges();
  }
}
