import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
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

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick(): void {
    let user = this.RegForm.value as user;
    this.authService.register(user).subscribe(
      (res) => {
        this.authService.currentUser = res.user;
        localStorage.setItem('token', res.token)
        this.router.navigate(['/']);
      },
      (error) => this.dialog.open(ServerErrorDialogComponent, { data: error.error })
    )
  }
}
