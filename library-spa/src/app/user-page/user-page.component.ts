import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Book from '../models/book';
import BooksEdition from '../models/bookEditions';
import User from '../models/user'

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

  user = new User();

  constructor(private authService: AuthService) { 
    authService.getMe().subscribe(
      (user) => this.user = user,
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {
  }

}
