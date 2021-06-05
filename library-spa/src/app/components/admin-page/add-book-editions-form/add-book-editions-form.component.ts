import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from '../../dialogs/server-error-dialog/server-error-dialog.component';
import Book from 'src/app/models/book';
import booksEditions from 'src/app/models/bookEditions';

@Component({
  selector: 'app-add-book-editions-form',
  templateUrl: './add-book-editions-form.component.html',
  styleUrls: ['./add-book-editions-form.component.css']
})
export class AddBookEditionsFormComponent implements OnInit {

  bookEditionsForm = new FormGroup({
    bookId: new FormControl('', Validators.required),
    pablishedYear: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    cover: new FormControl('', Validators.required),
    printedType: new FormControl('', Validators.required),
    pages: new FormControl('', Validators.required)
  });

  books: Array<Book> = [];

  constructor(private booksService: BooksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }
  add(): void {
    let bookEdition = this.bookEditionsForm.value as booksEditions;
    this.booksService.addBookEdition(bookEdition).subscribe(
      (res) => {this.bookEditionsForm.reset()},
      (error) => this.dialog.open(ServerErrorDialogComponent, {data: error.error})
    )
  }
}
