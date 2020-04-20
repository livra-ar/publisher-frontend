import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get serverUrl(){
    return 'https://ar-content-platform-backend.herokuapp.com/';
  }
}
