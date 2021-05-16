import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '.././services/books.service';
import { MatDialog } from '@angular/material/dialog';
import user from 'src/app/models/user';
import { ServerErrorDialogComponent } from '../dialogs/server-error-dialog/server-error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  LogForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  hide = true;

  constructor(private booksService: BooksService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  userLoginClick(): void {
    let user = this.LogForm.value as user;
    this.booksService.login(user).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (error) => this.dialog.open(ServerErrorDialogComponent, { data: error.error })
    )
  }

}
