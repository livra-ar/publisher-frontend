import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LongTextPipe } from '../pipes/long-text.pipe';
@NgModule({
  declarations: [
    CardListComponent,
    LongTextPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    // MatPaginatorModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatChipsModule,
    FlexLayoutModule
  ],
  exports: [CardListComponent]
})
export class CardListModule { }
