import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-server-error-dialog',
  templateUrl: './server-error-dialog.component.html'
})
export class ServerErrorDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ServerErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
