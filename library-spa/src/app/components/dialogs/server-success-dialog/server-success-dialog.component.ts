import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-server-success-dialog',
  templateUrl: './server-success-dialog.component.html',
  styleUrls: [
    './server-success-dialog.component.css'
  ]
})
export class ServerSuccessDialogComponent{

  constructor( public dialogRef: MatDialogRef<ServerSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

}
