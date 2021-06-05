import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service'
import Book from '../../models/book'
import Genre from '../../models/genre'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: Array<Book> = [];
  genres: Array<Genre> = [];
  searchString = '';

  constructor(
    private booksService: BooksService, 
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      (params) => {
        this.searchString = params['search'];
        this.getBooks(params)
      }
    );
    this.activeRoute.data.subscribe(
      data => {
        this.genres = data.genres
      }
    )
  }

  getBooks(params?: any) {
    this.booksService.getBooks(params).subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }
}

