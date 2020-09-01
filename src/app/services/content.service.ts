import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@app/services/config.service';
import { shareReplay } from 'rxjs/operators';
import { withCache, CacheBucket, HttpCacheManager } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private manager: HttpCacheManager
  ) {
    this.SERVER_URL = config.serverUrl + '/';
  }

  private SERVER_URL = "http://localhost:8000/";
  cacheBucket = new CacheBucket();
  getUsersContent(index = 0, size = -1, cache = true):Observable<any>{
      if(!cache){
        this.manager.delete(this.cacheBucket);
      }
      return this.http.get<any>(this.SERVER_URL + 'creator/content', withCache({bucket$:this.cacheBucket}));
  }

  getById(id: string):Observable<any>{
     return this.http.get<any>(this.SERVER_URL + 'content/' + id);
  }

  getByBookId(bookId:string){
    return this.http.get<any>(this.SERVER_URL + 'content/book/'+ bookId);
  }
  addContent(content:any){
     return this.http.post<any>(this.SERVER_URL+ 'content/', content);
  }

  updateContent(content:any){
   return this.http.put(this.SERVER_URL+ `content/${content.id}`, content);
  }

  deleteContent(id: string){
    return this.http.delete(`${this.SERVER_URL}content/${id}`);
  }

}
