import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-fullscreen-search',
  templateUrl: './fullscreen-search.component.html',
  styleUrls: ['./fullscreen-search.component.scss']
})
export class FullscreenSearchComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FullscreenSearchComponent>,
    private cd: ChangeDetectorRef,
  ) { }

  @ViewChild('searchInput') searchInput: MatInput;


  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.searchInput.focus();
    this.searchInput.value = this.data.query || '';
    this.cd.detectChanges();
 }
  
  onSubmit(){
    this.data.queryChange(this.searchInput.value);
    this.dialogRef.close();
 }

}
