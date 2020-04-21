import { Component, OnInit } from '@angular/core';
import { BooksService } from '@app/services/books.service';
import { ContentService } from '@app/services/content.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private booksService: BooksService,
    private contentSerivce: ContentService
  ) { }
  books$;
  content$;
  ngOnInit(): void {
    this.books$ = this.booksService.getUsersBooks().pipe(
      map(books => {
        return books.map(book => ({
          link: '/books/'+book.id,
          title: book.title,
          image: (book.covers) ? book.covers[0]: null,
          type: 'book',
          active: book.active
        }));
      })
      );
    this.content$ = this.contentSerivce.getUsersContent().pipe(
      map(contents => {
        return contents.map(content => ({
          link: '/content/'+content.id,
          title: content.title,
          image: (content.images) ? content.images[0]: null,
          active: content.active,
          type:'content'
        }));
      })
      );
  }

}
