import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor() { }
  @Input()
  spacing = 1;
  @Input()
  content: Observable<any[]>;
  @Input()
  user: any;

  cards;
  loading = true;
  @Input()
  cols = 4;

  @Input()
  emptyIcon

  @Input()
  emptyMessage

  
  ngOnInit(): void {
    this.content.subscribe(data => {
      if (data){
        this.cards = [];
        for(let i =0; i < data.length; i+= this.cols){
          this.cards.push(data.slice(i, i+this.cols));
        }
              } else {
         this.cards = data;
      }
      this.loading = false;
    });
  }

  pageChange(event):void{
    console.log("changed");
  }

}
