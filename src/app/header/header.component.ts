import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
   
 
  ) { }

  
  @Output()
  menuBtnClick = new EventEmitter();

  @Output()
  logoutBtnClick = new EventEmitter();

  @Output()
  loginBtnClick = new EventEmitter();

  @Output()
  registerBtnClick = new EventEmitter();

  @Output()
  addContentBtnClick = new EventEmitter();

  @Output()
  addBookBtnClick = new EventEmitter();

  @Input()
  loggedIn:Observable<any>;

  ngOnInit(): void {
   

  }
}
