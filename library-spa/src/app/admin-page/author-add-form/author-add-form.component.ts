import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from '../../dialogs/server-error-dialog/server-error-dialog.component';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-author-add-form',
  templateUrl: './author-add-form.component.html',
  styleUrls: ['./author-add-form.component.css']
})
export class AuthorAddFormComponent implements OnInit {

  createAuthorFrom = new FormGroup({
    fullName: new FormControl('', Validators.required),
    pseudonym: new FormControl(''),
    photo: new FormControl('')
  });

  constructor(private bookService: BooksService, public dialog: MatDialog) { };

  ngOnInit(): void {};


  add(): void {
    let author = this.createAuthorFrom.value;
    this.bookService.addAuthor(author).subscribe(
      (res) => {this.createAuthorFrom.reset()},
      (error) => this.dialog.open(ServerErrorDialogComponent, {data: error.error})
    )
  }
} 

