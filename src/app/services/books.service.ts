import { Injectable } from '@angular/core';
import { Book } from '@app/book';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }
  private SERVER_URL = "http://localhost:8000";
  addBook(book:Book){
    // PUT BOOK TODO:
    // Redirect to BookDetailView
    return this.http.post<any>(this.SERVER_URL+ '/book/', book);
  }

  getByPublisherId(id:number):Observable<any>{
    // GET BOOK TODO:
    return of([]);
  }

  getById(id):Observable<any>{
    return this.http.get<any>(this.SERVER_URL + '/book/' + id);
  }

  getUsersBooks():Observable<any>{
     return this.http.get<any>(this.SERVER_URL + '/publisher/books');
  }
  updateBook(book):any{

    return this.http.put(`${this.SERVER_URL}/book/${book.id}`, book);
  }

  deleteBook(id) {
    return this.http.delete(this.SERVER_URL+`/book/${id}`);
  }


}
