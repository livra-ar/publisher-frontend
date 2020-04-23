import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BooksService } from '@app/services/books.service';
import { ContentService } from '@app/services/content.service';
import { DialogService } from '@app/services/dialog.service';
import { of, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '@app/auth/auth.service';
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
    private authService: AuthService,
    private contentService: ContentService,
    private alert: DialogService
  ) { }

  public book;
  user;
  public content = new BehaviorSubject<any[]>([]);
  loading = true;
  ngOnInit(): void {

   this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          return this.bookService.getById(id);
        } else {
            return throwError({status: 404})
        }
      })
    ).subscribe(book => {
      this.book = book;
      this.loading = false;
      this.contentService.getByBookId(book.id).subscribe(content=>{
        this.content.next(content.map(content => ({
          link: '/content/'+content.id,
          title: content.title,
          image: (content.images) ? content.images[0]: null,
          active: content.active,
          type:'content'
        })));
      });
     }, err => {
       if(err.status != 404){
         this.alert.showErrorAlert(
           'An error occurred while fetching book data. Please refresh the page.',
           'Error');
       } else {
         this.router.navigate(['/not-found'])
       }
    });
    this.user = this.authService.getCurrentUser();

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
