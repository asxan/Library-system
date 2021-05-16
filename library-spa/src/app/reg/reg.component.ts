import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '.././services/books.service';
import { MatDialog } from '@angular/material/dialog';
import user from 'src/app/models/user';
import { ServerErrorDialogComponent } from '../dialogs/server-error-dialog/server-error-dialog.component';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  RegForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  hide = true;

  constructor(private booksService: BooksService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  userRegisterClick(): void {
    let user = this.RegForm.value as user;
    this.booksService.register(user).subscribe(
      (res) => this.RegForm.reset(),
      (error) => this.dialog.open(ServerErrorDialogComponent, { data: error.error })
    )
  }
}
