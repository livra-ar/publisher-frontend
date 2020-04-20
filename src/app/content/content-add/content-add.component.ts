import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContentService } from '@app/services/content.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileUploadComponent } from '@app/file-upload/file-upload.component';
import { BooksService } from '@app/services/books.service';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.scss']
})
export class ContentAddComponent implements OnInit {

  addContentForm = this.fb.group({
     title: ['', Validators.required],
     description: ['', [
       Validators.required, Validators.minLength(100)
     ]],
     book: ['', [Validators.required]]
   });

  constructor(
    private contentService: ContentService,
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService
  ) { }

  fileError = true;
  imageError = true;
  maxFiles = 1;
  maxImageFiles = 3;
  fileUrls;
  imageUrls;
  books$

  @ViewChild('fileUpload')
  fileUpload : FileUploadComponent;

  @ViewChild('imageUpload')
  imageUpload : FileUploadComponent;

  ngOnInit(): void {
    this.books$ = this.booksService.getUsersBooks().pipe(
      catchError(err => {
        this.alert.showErrorAlert(
        'An error occurred while fetching your books. Please refresh the page.',
        'Error');
        return of(null);
      }));
  }

  onSubmit(){
    this.fileUpload.saveChanges();
  }

  onImageUploadComplete(imageUrls){
    this.imageUrls = imageUrls;

    this.contentService.addContent({
      title: this.addContentForm.get('title').value,
      description: this.addContentForm.get('description').value,
      book: this.addContentForm.get('book').value,
      file: this.fileUrls[0],
      images: this.imageUrls
    }).subscribe(content=> {
      this.alert.showSuccessAlert(
        'Content successfully added!',
        'Success');
      this.router.navigate([`content/${content.id}`])
    }, err => {
      this.alert.showErrorAlert(
        'An error occurred while adding content. Please refresh the page and try again.',
        'Error');
    });
  }

  onFileUploadComplete(fileUrls){
    this.fileUrls = fileUrls;
    this.imageUpload.saveChanges();
  }

  onFileInputChange(files){
    this.fileError = files.length < 1;
  }

  onImageInputChange(images){
     this.imageError = images.length < 1;
  }
}
