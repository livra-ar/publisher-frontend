import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentRoutingModule } from './content-routing.module';

import { ContentDetailComponent } from './content-detail/content-detail.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { ContentEditComponent } from './content-edit/content-edit.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from '@app/file-upload/file-upload.module';

@NgModule({
  declarations: [
    ContentDetailComponent,
    ContentAddComponent,
    ContentEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContentRoutingModule,
        MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FileUploadModule,
    MatSelectModule,

  ]
})
export class ContentModule { }
