import { Component, OnInit } from '@angular/core';
import Book from '../models/book';
import BooksEdition from '../models/bookEditions';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  orders = [
    {
      returnDate: "05 May 2021",
      orderDate: "01 May 2021",
      book: new Book(),
      edition: new BooksEdition(),
      status: "Returned"

    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
