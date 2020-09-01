import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap,tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ContentService } from '@app/services/content.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadComponent } from '@app/file-upload/file-upload.component';
import { BooksService } from '@app/services/books.service';
import { DialogService } from '@app/services/dialog.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
     book: ['', Validators.required],
     animated: [false]
   });

  content;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContentEditComponent>,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private booksService: BooksService,
    private fb: FormBuilder,
    private alert: DialogService
  ) { }

    fileError = true;
  imageError = true;
  maxFiles = 1;
  maxImageFiles = 3;
  maxImageSize = 10000;
  fileSize;
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
 
       this.content = this.data.content;
        this.editContentForm.patchValue({
           title: this.content.title,
           description: this.content.description,
           book: this.content.book.id,
           animated: this.content.animated
         });
         this.existingFile.next([this.content.file]);
         this.existingImages.next(this.content.images);
         this.fileSize = this.content.size;
         this.fileError = this.content.file == '' || this.content.file == null;
         this.imageError = this.content.images.length < 1;
         this.loading = false;


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
  onImageUploadComplete(imageUrls){
    this.imageUrls = imageUrls;

    this.contentService.updateContent({
      id: this.content.id,
      title: this.editContentForm.get('title').value,
      description: this.editContentForm.get('description').value,
      file: this.fileUrls[0],
      images: this.imageUrls,
      book: this.editContentForm.get('book').value,
      size: this.fileSize,
      animated: this.editContentForm.get('animated').value
    }).subscribe((content :any)=> {
      this.content.title = content.title;
      this.content.description = content.description;
      this.content.file = content.file;
      this.content.covers = content.covers;
      this.content.animated = content.animated;
      this.content.size = content.size;
      this.saving = false;
      this.dialogRef.close();
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
    this.fileSize = files[0].data.size;
  }

  onImageInputChange(images){
     this.imageError = images.length < 1;
     for (const image of images){
        if (image.data.size < this.maxImageSize){
          this.imageError = true;
          this.alert.showErrorAlert(
          `Selected image is larger than maximum allowed size.`
          + `Please remove it and add an image with size less than ${this.maxImageSize}`,
          'Error');
          return;
        }
     }
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
