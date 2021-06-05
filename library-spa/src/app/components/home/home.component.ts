import Book from 'src/app/models/book';
import { Component, OnInit } from '@angular/core';
import StatsService from 'src/app/services/stats.service';
import Author from 'src/app/models/author';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topbooks: Book[] = [];
  topauthors: Author[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getTopBooks().subscribe(
      books => this.topbooks = books
    )
    this.statsService.getTopAuthors().subscribe(
      authors => this.topauthors = authors
    )
  }

}
