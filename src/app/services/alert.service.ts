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
    this.dialog.open(AlertDialog, {
      width: `${width}px`,
      data: {title, message, type},
    });
  }

  showSuccessAlert(message:string = "Action performed successfully",
    title:string = "Success", width = 250){
    this.showAlert(
      message,
      title,
      width,
      'success'
    );
  }


  showErrorAlert(message:string = "An error occured",
    title:string = "Error", width = 250){
    this.showAlert(
      message,
      title,
      width,
      'error'
    );
  }


}
