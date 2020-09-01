import { Injectable } from '@angular/core';
// import { Book } from '@app/book';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@app/services/config.service';
import { shareReplay } from 'rxjs/operators';
import { withCache, CacheBucket, HttpCacheManager } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private manager: HttpCacheManager
  ) {
    this.SERVER_URL = config.serverUrl;
  }
  
  private SERVER_URL = "http://localhost:8000";
  cacheBucket = new CacheBucket();
  addBook(book){
    return this.http.post<any>(this.SERVER_URL+ '/book/', book);
  }

  getById(id:string):Observable<any>{
    return this.http.get<any>(this.SERVER_URL + '/book/' + id);
  }

  getUsersBooks(index = 1, size = -1, cache = true):Observable<any>{
    if(!cache){
     this.manager.delete(this.cacheBucket);
    }
    return this.http.get<any>(this.SERVER_URL + '/publisher/books', withCache({
      bucket$: this.cacheBucket
    }));
  }

  updateBook(book):any{
    return this.http.put(`${this.SERVER_URL}/book/${book.id}`, book);
  }

  deleteBook(id:string) {
    return this.http.delete(this.SERVER_URL+`/book/${id}`);
  }


}
