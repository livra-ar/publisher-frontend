import { Injectable } from '@angular/core';
import { Feedback } from '@app/interfaces/feedback';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private SERVER_URL;

  constructor(
    private config: ConfigService,
    private http: HttpClient) {
    this.SERVER_URL = config.serverUrl + '/';
  }

  postFeedback(feedback: Feedback){
    let formData = new FormData();
    formData.append('name', feedback.name);
    formData.append('subject', feedback.subject);
    formData.append('email', feedback.email);
    formData.append('message', feedback.message);
    return this.http.post<any>(this.SERVER_URL + 'feedback', formData);
  }
}
