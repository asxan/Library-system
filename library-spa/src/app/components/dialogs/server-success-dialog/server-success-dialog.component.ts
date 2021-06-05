import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-server-success-dialog',
  templateUrl: './server-success-dialog.component.html',
  styleUrls: [
    './server-success-dialog.component.css'
  ]
})
export class ServerSuccessDialogComponent  implements OnInit{

  constructor( 
    public dialogRef: MatDialogRef<ServerSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
