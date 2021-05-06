import { Component, Input, OnInit } from '@angular/core';
import Book from '../models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html'
})
export class BookItemComponent implements OnInit {

  @Input() book = new Book();

  constructor() {}

  ngOnInit() {}
}

