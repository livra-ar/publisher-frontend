import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.SERVER_URL = config.serverUrl + '/';
  }

  private SERVER_URL = "http://localhost:8000/";

  getByCreatorId(id){

  }

  getUsersContent():Observable<any>{
     return this.http.get<any>(this.SERVER_URL + 'creator/content');
  }


  getById(id):Observable<any>{
     return this.http.get<any>(this.SERVER_URL + 'content/' + id);
  }

  getByBookId(bookId){
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
