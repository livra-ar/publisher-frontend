import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BooksService } from '@app/services/books.service';
import { ContentService } from '@app/services/content.service';
import { AlertService } from '@app/services/alert.service';
import { of, BehaviorSubject } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private contentService: ContentService,
    private alert: AlertService
  ) { }

  public book;

  public content = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    
   this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.bookService.getById(id);
      })
    ).subscribe(book => {
      this.book = book;
      this.contentService.getByBookId(book.id).subscribe(content=>{
        this.content.next(content);
      });
     }, err => {
      this.alert.showErrorAlert(
        'An error occurred while fetching book data. Please refresh the page.',
        'Error');
    });

  }

  delete(){
    this.bookService.deleteBook(this.book.id).subscribe(
      message =>  {
        this.alert.showSuccessAlert(
          'Book successfully deleted!',
          'Success');
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.alert.showErrorAlert(
          'An error occurred while deleting book. Please try again.',
          'Error');
      }
    );
  }

}
