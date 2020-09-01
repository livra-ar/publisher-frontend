import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
describe('AlertService', () => {
  let service: DialogService;
  let matDialogSpy;
  let matDialogRefSpy;

  beforeEach(() => {
    matDialogSpy =  jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRefSpy =  jasmine.createSpyObj('MatRefDialog', ['close']);
    TestBed.configureTestingModule({
        providers : [
        {
            provide: MatDialog,
            useValue: matDialogSpy
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRefSpy
        }, {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }]
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#showDialog', ()=> {
      it('should call dialog.open with correct parameters', ()=> {
          let width = 100;
          let title = 'title';
          let message = 'message';
          let type = 'success_alert';
          service.showDialog(
              message,
              title,
              width,
              type);
          expect(matDialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
                 width: `${width}px`,
              data: {title, message, type},
          });
      })
  });

    describe('#showSuccessAlert', ()=> {
      it('should call dialog.open with correct parameters', ()=> {
          let width = 100;
          let title = 'title';
          let message = 'message';
          let type = 'success_alert';
          service.showSuccessAlert(
              message,
              title,
              width);
          expect(matDialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
                 width: `${width}px`,
              data: {title, message, type},
          });
      })
  });


    describe('#showErrorAlert', ()=> {
      it('should call dialog.open with correct parameters', ()=> {
          let width = 100;
          let title = 'title';
          let message = 'message';
          let type = 'error_alert';
          service.showErrorAlert(
              message,
              title,
              width);
          expect(matDialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
                 width: `${width}px`,
              data: {title, message, type},
          });
      });
  });

        describe('#showConfirm', ()=> {
      it('should call dialog.open with correct arguments', ()=> {
          let width = 100;
          let title = 'title';
          let message = 'message';
          let type = 'confirm';
          service.showConfirm(
              message,
              title,
              width);
          expect(matDialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
                 width: `${width}px`,
              data: {title, message, type},
          });
      });
  });
});
