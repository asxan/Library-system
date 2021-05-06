import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Book from '../models/book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book: Book = new Book();

  constructor(private bookService: BooksService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param) => {
        this.bookService.getBook(param.id).subscribe(
          (res) => this.book = res,
          (err) => this.router.navigate(['search'])
        );        
      },
    );
  }


}
