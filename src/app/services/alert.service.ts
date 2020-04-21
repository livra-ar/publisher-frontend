import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog } from '@app/shared/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialog: MatDialog
  ) { }

  showAlert(message:string, title:string, width:number, type: string){
    return this.dialog.open(AlertDialog, {
      width: `${width}px`,
      data: {title, message, type},
    });
  }

  showSuccessAlert(message:string = "Action performed successfully",
    title:string = "Success", width = 250){
    return this.showAlert(
      message,
      title,
      width,
      'success'
    );
  }


  showErrorAlert(message:string = "An error occured",
    title:string = "Error", width = 250){
    return this.showAlert(
      message,
      title,
      width,
      'error'
    );
  }


}
