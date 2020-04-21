import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '@app/services/config.service';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private SERVER_URL: string = 'http://localhost:8000/upload';

  constructor(
    public http$: HttpClient,
    private config: ConfigService
  ) {

      this.SERVER_URL = this.config.serverUrl + '/upload';
    }

    public uploadFiles(formData: FormData, type: 'images' | 'files'){
      let url = this.SERVER_URL;
      let fileName = 'file';
      if (type === 'files'){
        url += `/raw/${fileName}`;
      }else{
        url += `/img/${fileName}`;
      }
    return this.http$.post<any>(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteFiles(urls){
    let ids = urls.map(url => url.match(`https?://res.cloudinary.com/db2rl2mxy/[a-z0-9/]+/(.*)\....`)[1]);
    for (let id of ids){
      this.http$.delete<any>('http://localhost:8000/files/delete/'+id+'/',).subscribe();
    }
  }

}