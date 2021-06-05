import { Component, Input, OnInit } from '@angular/core';
import Book from '../../../models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book | undefined;
  @Input() searchString: String | undefined;

  authorsString: string | undefined

  constructor() {

  }

  ngOnInit() {
    this.authorsString = this.book?.authors.map(a => a.pseudonym).join(', ')
    console.log(this.book?.authors)
  }
}

