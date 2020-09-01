import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentAddComponent } from './content-add.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ContentService } from '@app/services/content.service';
import { BooksService } from '@app/services/books.service';
import { DialogService } from '@app/services/dialog.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockContentService {
  addContent(content){
    return of (content);
  }
}
class MockBooksService {
  getUsersBooks(){
   return  of ([{
        'id': '312321312',
        'title': 'Test Book'
        }
      ]
     );
  }
}
describe('ContentAddComponent', () => {
  let component: ContentAddComponent;
  let fixture: ComponentFixture<ContentAddComponent>;
  let router = jasmine.createSpyObj('Router', ['navigate'])
  let dialogServiceSpy = jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showSuccessALert']);
  let matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAddComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule,        MatSelectModule, 
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule],
      providers : [
        {
          provide: ContentService,
          useClass: MockContentService
        },
        {
          provide: BooksService,
          useClass: MockBooksService
        },
        {
          provide: Router,
          useValue: router
        },
        {
          provide: DialogService,
          useValue: dialogServiceSpy
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRefSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
