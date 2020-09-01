import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentEditComponent } from './content-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '@app/services/dialog.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { of } from 'rxjs';
import { ContentService } from '@app/services/content.service';
import { BooksService } from '@app/services/books.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockContentService{
  updateContent(data){
    of(data)
  }
}

class MockBookService{
  getUsersBooks(){
    return of([{
      id: '123555',
      title: 'Book'
    }])
  }
}


describe('ContentEditComponent', () => {
  let component: ContentEditComponent;
  let fixture: ComponentFixture<ContentEditComponent>;
  let dialogRefSpy =   jasmine.createSpyObj('MatDialogRef', ['close']);
  let dialogServiceSpy =  jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showConfirm', 'showSuccessAlert']);
  
  let data = {
    content: {
      id: '12345678',
      title: 'Title',
      description: 'Description',
      images: ['http://localhost/a.jpg'],
      file: 'http://localhost/b.jpg',
      creator : {
        'id': '12345678',
        'name': 'publisher'
      }, 
      book: {
        'id':'123213',
        'title':'dasd'
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentEditComponent],
      imports: [
        RouterTestingModule, 
        ReactiveFormsModule,    
        MatSelectModule, 
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule

       ],
      providers : [
      {
        provide : MAT_DIALOG_DATA,
        useValue: data
      },
      {
        provide: MatDialogRef,
        useValue: dialogRefSpy
      },
      {
        provide: DialogService,
        useValue: dialogServiceSpy
      }, 
      {
        provide: ContentService,
        useClass: MockContentService
      },
      {  
        provide: BooksService,
        useClass: MockBookService
      }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
