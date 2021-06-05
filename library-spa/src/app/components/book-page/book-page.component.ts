import { ServerSuccessDialogComponent } from './../dialogs/server-success-dialog/server-success-dialog.component';
import { OrdersService } from './../../services/orders.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Book from '../../models/book';
import CreateOrderModel from '../../models/createOrder';
import { BooksService } from '../../services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from '../dialogs/server-error-dialog/server-error-dialog.component';
import Genre from 'src/app/models/genre';
import Author from 'src/app/models/author';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book:  Book | undefined;
  authors: Author[] = [];
  genres: Genre[] = [];

  constructor(
    private bookService: BooksService, 
    private orderService: OrdersService,
    private route: ActivatedRoute, 
    private router : Router,
    private auth : AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (param) => {
        this.bookService.getBook(param.id).subscribe(
          (res) => {
            this.book = res
            this.authors = this.book.authors
            this.route.data.subscribe(
              data => {
                this.genres = data.genres.filter((g:Genre)  => res.genres.includes(g._id ?? ""))
              }
            )
          },
          (err) => this.router.navigate(['search'])
        );
      },
    );
  }

  order(editionId: string | undefined){
    console.log(editionId)
    console.log(!this.auth.loggedIn())
    if (!editionId || !this.auth.loggedIn()) return;
    if(!this.book) return

    let order = new CreateOrderModel(this.book?._id, editionId, 5);

    this.orderService.order(order).subscribe(
      (res) => {
        this.dialog.open(ServerSuccessDialogComponent, {data: 'Success!'})
      },
      (error) => {
        console.log(error);
        this.dialog.open(ServerErrorDialogComponent, {data: error})
      }
    )
  }


}
