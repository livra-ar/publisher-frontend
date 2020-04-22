import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap,tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ContentService } from '@app/services/content.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadComponent } from '@app/file-upload/file-upload.component';
import { BooksService } from '@app/services/books.service';
import { AlertService } from '@app/services/alert.service';
@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss']
})
export class ContentEditComponent implements OnInit {

   editContentForm =  this.fb.group({
     title: ['', Validators.required],
     description: ['', [
       Validators.required, Validators.minLength(100)
     ]],
     book: ['', Validators.required]
   });

  content;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private booksService: BooksService,
    private fb: FormBuilder,
    private alert: AlertService
  ) { }

    fileError = true;
  imageError = true;
  maxFiles = 1;
  maxImageFiles = 3;
  fileUrls;
  imageUrls;
  existingFile = new BehaviorSubject(null);
  existingImages = new BehaviorSubject(null);
  @ViewChild('fileUpload')
  fileUpload : FileUploadComponent;
  books
  loading = true;
  saving = false;

  @ViewChild('imageUpload')
  imageUpload : FileUploadComponent;


  ngOnInit(): void {
      this.route.paramMap.pipe(
       switchMap(params => {
         const id = params.get('id');
         const content = this.contentService.getById(id);
         return content;
       }),
       tap((content: any) => {
           this.editContentForm.patchValue({
           title: content.title,
           description: content.description,
           book: content.book.id
         });

       })
     ).subscribe(content=> {
       this.content = content
         this.existingFile.next([content.file]);
         this.existingImages.next(content.images);
         this.fileError = this.content.file == '' || this.content.file == null;
         this.imageError = this.content.images.length < 1;
         this.loading = false;

     }, err => {
      this.alert.showErrorAlert(
        'An error occurred while fetching content data. Please refresh the page.',
        'Error');
     });

     this.booksService.getUsersBooks().subscribe(
        books => {
          this.books = books;

        }, err=> {
          this.alert.showErrorAlert(
            'An error occurred while fetching your books. Please refresh the page.',
            'Error');
        });
  }

  onSubmit(){
    this.saving= true;
    this.fileUpload.saveChanges();
  }

  onImageUploadComplete(imageUrls){
    this.imageUrls = imageUrls;

    this.contentService.updateContent({
      id: this.content.id,
      title: this.editContentForm.get('title').value,
      description: this.editContentForm.get('description').value,
      file: this.fileUrls[0],
      covers: this.imageUrls,
      book: this.editContentForm.get('book').value
    }).subscribe(content=> {
      this.saving = false;
      this.alert.showSuccessAlert(
        'Content successfully updated!',
        'Success');
    }, err=> {
      this.saving = false;
      this.alert.showErrorAlert(
        'An error occurred while updating content. Please refresh the page and try again.',
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

  get title(){
    return this.editContentForm.get('title')
  }
  get description(){
    return this.editContentForm.get('description')
  }
  get book(){
    return this.editContentForm.get('book')
  }

}
