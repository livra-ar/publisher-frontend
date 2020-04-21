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
  content: Observable<any[]>;

  cards;
  loading = true;

  ngOnInit(): void {
    this.content.subscribe(data => {
      this.cards = data;
      this.loading = false;
    });
  }

}
