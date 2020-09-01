import { Component, OnInit } from '@angular/core';
import { BooksService } from '@app/services/books.service';
import { ContentService } from '@app/services/content.service';
import { AuthService } from '@app/auth/auth.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenSearchComponent } from '@app/fullscreen-search/fullscreen-search.component';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import * as JsSearch from 'js-search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bookResults = 0;
  contentResults = 0;
  bookSearch: any;
  contentSearch: any;
  bookIndex:number = 0;
  contentIndex:number = 0;
  booksLoading: boolean = true;
  contentLoading:boolean = true;
  constructor(
    private booksService: BooksService,
    private contentSerivce: ContentService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }
  books$ = new BehaviorSubject([]);
  content$ = new BehaviorSubject([]);
  content_count = 0;
  book_count = 0;

  user;
  query = {
    content: '',
    books : ''
  };
  currentTab : ("books" | "content") = "content";
  // navLinks = [
  //       {
  //           label: 'Content',
  //           link: './content',
  //           index: 0
  //       }, {
  //           label: 'Books',
  //           link: './books',
  //           index: 1
  //       },
  //   ];
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.bookSearch = new JsSearch.Search('id');
    this.bookSearch.addIndex('title');
    this.contentSearch = new JsSearch.Search('id');
    this.contentSearch.addIndex('title');
    
    this.fetchBooks(0, 8);
    this.fetchContent(0, 8);
  }

  fetchContent(index, size, query=null, cache=true){
    this.contentLoading = true;
    this.contentSerivce.getUsersContent(index, size,cache).pipe(
      map(contents => {
         this.content_count  = contents.length;

          if(size === -1){
            size = contents.length;
          } else {
            size = Math.min(contents.length, size);
          }

          index = Math.max(0, index);
          this.contentSearch.addDocuments(contents);

          if(query)
            contents =  this.contentSearch.search(query);

          this.contentResults = contents.length;

          this.content$.next(contents.map(content => ({
          link: '/content/'+content.id,
          title: content.title,
          image: (content.images) ? content.images[0]: null,
          active: content.active,
          type:'content',
          owner: content.creator.id
        })).slice(index*size, index*size + size ));

        this.contentLoading = false;

      })
      ).subscribe();
  }
  fetchBooks(index, size, query = null, cache=true){
    this.booksLoading = true;
    this.booksService.getUsersBooks(index, size, cache).pipe(
      map(books => {

        this.book_count  = books.length;
        
        if(size === -1){
          size = books.length;
        } else {
          size = Math.min(books.length, size);
        }

        index = Math.max(0, index);

        this.bookSearch.addDocuments(books);

        if(query)
          books =  this.bookSearch.search(query);

        this.bookResults = books.length;  
        this.books$.next(
          books.map(book => 
            ({
              link: '/books/'+book.id,
              title: book.title,
              image: (book.covers) ? book.covers[0]: null,
              type: 'book',
              active: book.active,
              owner: book.publisher.id
            })
          ).slice(index*size, index*size + size)
        );

        this.booksLoading =false;
      })
      ).subscribe();
  }

  loadItems(pageIndex, pageSize, query, cache=true){
    switch (this.currentTab){
      case "books":
        this.fetchBooks(pageIndex, pageSize, query, cache);
        break;
      case "content":
        this.fetchContent(pageIndex, pageSize, query, cache);
        break;
    }
  }

  reload(){
    switch (this.currentTab){
      case "books":
        this.loadItems(this.bookIndex, this.bookPageSize, this.query.books, false);
        break;
      case "content":
        this.loadItems(this.contentIndex, this.contentPageSize, this.query.content, false);
        break;
    }
  }

  onPageEvent(event){
    let query;
    switch (this.currentTab){
      case "books":
        this.bookPageSize = event.pageSize;
        this.bookIndex = event.pageIndex;
        query = this.query.books;
        break;
      case "content":
        this.contentPageSize = event.pageSize;
        this.contentIndex = event.pageIndex;
        query = this.query.content;
        break;
    }

    this.loadItems(event.pageIndex, event.pageSize, query);
  }

  
  bookPageSize = 8;
  contentPageSize = 8;

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    this.currentTab = (tabChangeEvent.index === 0) ? "content" : "books";
  }

  queryChange(query){

    let pageSize;
    if (this.currentTab === "books") {
      pageSize = this.bookPageSize;
      this.query.books = query;
    }else if(this.currentTab === "content"){
      pageSize = this.contentPageSize;
      this.query.content = query;
    }
    this.loadItems(0, pageSize, query);
  }

  showSearch(){
    const dialogRef = this.dialog.open(FullscreenSearchComponent, {
      height: '115px',
      width: '320px',
      disableClose:false,
      data: {
        queryChange: this.queryChange.bind(this),
        query: (this.currentTab === 'books') ? this.query.books : this.query.content
      }
    });
  }

}
