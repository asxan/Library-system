import { Component, OnInit } from '@angular/core';
import Author from '../../models/author';
import Genre from '../../models/genre';
import { BooksService } from '../../services/books.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from '../../dialogs/server-error-dialog/server-error-dialog.component';
import Book from 'src/app/models/book';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  BookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    publishingHouse: new FormControl('', Validators.required),
    publicationYear: new FormControl('', Validators.required),
    authors: new FormControl('', Validators.required),
    genres: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  authors: Array<Author> = [];
  genres: Array<Genre> = [];


  constructor(private booksService: BooksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.booksService.getAuthors().subscribe(
      (data) => {
        this.authors = data;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );

    this.booksService.getGenres().subscribe(
      (data) => {
        this.genres = data;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  add(): void {
    let book = this.BookForm.value as Book;
    this.booksService.addBook(book).subscribe(
      (res) => {this.BookForm.reset()},
      (error) => this.dialog.open(ServerErrorDialogComponent, {data: error.error})
    )
  }


}
