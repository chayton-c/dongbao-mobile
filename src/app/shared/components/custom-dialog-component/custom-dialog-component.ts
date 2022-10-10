import {Component, Inject, Input} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'custom-dialog-component',
  templateUrl: 'custom-dialog-component.html',
  styleUrls: ['custom-dialog-component.less']
})
export class CustomDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      errorMsg: string,
      title?: string
    }) {
    document.body.style.backgroundColor = "#ffffff";
  }
}
