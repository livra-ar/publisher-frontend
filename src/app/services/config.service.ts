import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get serverUrl(){
    return 'https://ar-content-platform-backend.herokuapp.com';
  }

  get cloudinaryId(){
  	return 'db2rl2mxy';
  }

  get maxImageSize(){
  	return 10000;
  }
}
