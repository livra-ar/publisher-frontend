import { Component, OnInit, ViewChild, ElementRef, Input, forwardRef,Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpEventType, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileUploadService } from  '../services/file-upload.service';

interface File{
  data: any;
  inProgress: boolean;
  progress: number;
  status? : 'uploading' | 'deleting' | 'uploaded';
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements ControlValueAccessor {

  @Input('max')
  public maximum:number = 3;

  @Input ('type')
  public type : 'images' | 'files' = 'images';

  @Input ('hint')
  public hint:string;

  @Input ('label')
  public label:string;

  @Input ('existingFiles')
  public existingFiles: Observable<string[]>;

  @Output()
  changed = new EventEmitter<File[]>();

  @Output()
  uploaded = new EventEmitter<string[]>();

  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef;

  files = [];

  constructor(
    private uploadService: FileUploadService
  ) {}

  private newlyAdded = 0;
  private completeUrls = [];
  private onChanged : (any) => any;
  private onTouched : () => any;
  private fileUrls = [];
  private toBeDeleted = [];

  ngOnInit(): void {
   this.existingFiles?.subscribe(files => {
     this.files = [];
     //console.log(files)
     if (files){
        for(let url of files){
          this.files.push({
            data: { name: url},
            inProgress: false,
            progress: 100,
            status: 'uploaded'});
            this.fileUrls.push(url);
        }


      }
   })
  }

  uploadFile(file: File){
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;

    this.uploadService.uploadFiles(formData, this.type).pipe(
      map(event => {
        // console.log(event);
        // console.log(this);
        switch(event.type){
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
     catchError((error: HttpErrorResponse) => {
       file.inProgress = false;
       return of(null);
     })
    ).subscribe((event: any) => {

      // this.completeUrls.push(event.data);
      if(file.progress >= 100 && event){
        this.completeUrls.push(event.body.url);
        file.inProgress = false;
        file.status = 'uploaded';
        file.data = { url: event.url};
      }
      // console.log(this.completeUrls, this.newlyAdded)
      if (this.completeUrls.length === this.newlyAdded){
        this.fileUrls.push(...this.completeUrls);
        this.uploaded.emit(this.fileUrls);
        this.completeUrls = [];
              this.newlyAdded=0;
      }
    });
  }

  saveChanges(){
    this.deleteFiles();
    if (this.newlyAdded > 0){
      this.uploadFiles();
    }else{
      this.uploaded.emit(this.fileUrls);
    }
  }

  public uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    // console.log(this);
    this.files.forEach(file => {
      if (file.status !== 'uploading') return;
      this.uploadFile(file);
    });
  }

  deleteFiles(){
    const urls = this.toBeDeleted.map(file => file.data.name);
    this.uploadService.deleteFiles(urls);
  }

  public onClick(){
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++){
        const file = fileUpload.files[index];
        this.addFile({ data: file, inProgress: false, progress: 0, status: 'uploading'});
      }
    };
    //this.onTouched();
    fileUpload.click();
  }

  writeValue(fileList){
    if (fileList){
      this.files = fileList;
    }
  }

  registerOnChange(fn){
    this.onChanged = fn;
  }

  registerOnTouched(fn){
    this.onTouched = fn;
  }

  addFile(file: File){
    this.files.push(file);
    this.changed.emit(this.files);
    this.newlyAdded++;
    //console.log(this.newlyAdded)

    // this.onChanged(this.files);
  }

  public removeFile(index){
    const file = this.files[index];

    if (file.status == 'uploaded'){
      this.toBeDeleted.push(file);
      const index = this.fileUrls.indexOf(file.url);
      this.fileUrls.splice(index, 1);
    }else{
      this.newlyAdded--;
    }
    this.files.splice(index, 1);
    this.changed.emit(this.files);

    // this.onChanged(this.files);
    // this.onTouched();
  }

}
