import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
interface AlertData{
  title: string;
  message: string;
  type ?: 'success_alert'| 'error_alert' | 'confirm';
}
@Component({
  selector: 'app-alert',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData) {}


}
