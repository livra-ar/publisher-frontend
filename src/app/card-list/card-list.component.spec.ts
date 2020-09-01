import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CardListComponent } from './card-list.component';
import {LongTextPipe } from '../pipes/long-text.pipe';
let content = [
   {
        link: '/content/abcd12.titl34',
        title: 'Title',
        image: 'https://localhost/image.jpg',
        type: 'content',
        active: true
   }
 ];
describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListComponent, LongTextPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    component.content = of(content);
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
