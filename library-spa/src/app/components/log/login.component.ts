import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { MatDialog } from '@angular/material/dialog';
import user from 'src/app/models/user';
import { ServerErrorDialogComponent } from '../dialogs/server-error-dialog/server-error-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl = '/'
  
  LogForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  hide = true;

  constructor(
    private authService: AuthService, 
    public dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  userLoginClick(): void {
    let user = this.LogForm.value as user;
    this.authService.login(user).subscribe(
      (res) => {
        this.authService.currentUser = res.user;
        localStorage.setItem('token', res.token)
        this.router.navigate([this.returnUrl]);
      },
      (error) => this.dialog.open(ServerErrorDialogComponent, { data: error.error })
    )
  }

}
