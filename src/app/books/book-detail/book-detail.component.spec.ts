import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksRoutingModule } from '@app/books/books-routing.module';
import { BookDetailComponent } from './book-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailComponent ],
      imports: [BooksRoutingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
