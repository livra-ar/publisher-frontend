import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {of} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { BooksService } from '@app/services/books.service';
import { ContentService } from '@app/services/content.service';
import { AuthService } from '@app/auth/auth.service';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
const books =   [{
        id: 'abcd1234',
        title: 'Title',
        authors: ['Author K.'],
        active: true,
        isbns: ['1234567890'],
        covers: ['https://localhost/cover.png'],
        publisher: {
          id: '123456789'
        }
      }];
const content = [
      {
        id: 'efgh1234',
        title: 'Content',
        description:'This is a mock content',
        size: 4000,
        creator : {
          id: '123456789',
          name: 'UserName'
        },
        active: true,
        images: ['https://localhost/preview.png'],
        files: ['https://localhost/file.sfb'],
        book: books[0]
      }
    ];

 let expectedBooks = [
   {
        link: '/books/'+ books[0].id,
        title: books[0].title,
        image: books[0].covers[0],
        type: 'book',
        active: books[0].active,
        owner: books[0].publisher.id
   }
 ];

  let expectedContent = [
   {
        link: '/content/'+ content[0].id,
        title: content[0].title,
        image: content[0].images[0],
        type: 'content',
        active: content[0].active,
        owner: content[0].creator.id
   }
 ];
class MockBookService{
  getUsersBooks(){
    return of(books);
  }
}

class MockContentService{
  getUsersContent(){
    return of(content);
  }
}


class MockAuthService{
  getCurrentUser(){
    return of({});
  }
}



@Component({selector: 'app-card-list', template: ''})
class CardListComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let booksService;
  let contentService;
  let authService;
  let booksCardList;
  let contentCardList;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, CardListComponent ],
      providers : [
        {provide: BooksService, useClass: MockBookService},
        {provide: ContentService, useClass: MockContentService},
        {provide: AuthService, useClass: MockAuthService},
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
    booksService = TestBed.inject(BooksService);
    contentService = TestBed.inject(ContentService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    booksCardList = fixture.nativeElement.querySelector('#books-card-list');
    contentCardList = fixture.nativeElement.querySelector('#content-card-list');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate content$ and books$ after Angular calls ngOnInit', () => {
    component.ngOnInit();

    component.books$.subscribe(_books => expect(_books).toEqual(expectedBooks));
    component.content$.subscribe(_content => expect(_content).toEqual(expectedContent));
    fixture.detectChanges();
    /*
      Need to test if the props are set
    */
  });

  
});
