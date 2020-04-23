import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  showDialog(message:string, title:string, width:number, type: string){
    return this.dialog.open(DialogComponent, {
      width: `${width}px`,
      data: {title, message, type},
    });
  }

  showSuccessAlert(message:string = "Action performed successfully",
    title:string = "Success", width = 250){
    return this.showDialog(
      message,
      title,
      width,
      'success_alert'
    );
  }


  showErrorAlert(message:string = "An error occured",
    title:string = "Error", width = 250){
    return this.showDialog(
      message,
      title,
      width,
      'error_alert'
    );
  }

  showConfirm(message:string = "Are you sure?",
  title:string="Confirm", width= 250){
    return this.showDialog(
      message,
      title,
      width,
      'confirm'
    );
  }

}
