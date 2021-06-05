import { OrderStatus } from './../../models/orderStatus';
import { ServerErrorDialogComponent } from './../dialogs/server-error-dialog/server-error-dialog.component';
import { ServerSuccessDialogComponent } from './../dialogs/server-success-dialog/server-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from './../../services/orders.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Book from '../../models/book';
import BooksEdition from '../../models/bookEditions';
import User from '../../models/user'
import Order from '../../models/order';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  orders = new Array<Order>();
  OrderStatus = OrderStatus;
  user = this.authService.currentUser;

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.authService.currentUser ?? new User();
    this.ordersService.getUserOrders(this.user._id).subscribe(
      (res) => {
        this.orders = res;
      },
      (error) => {
        this.dialog.open(ServerErrorDialogComponent, { data: error })
      });
  }

  cancelOrder(id: string | undefined) {
    if (!id) return;

    this.ordersService.cancelOrder(id).subscribe(
      (res) => {
        this.dialog.open(ServerSuccessDialogComponent, { data: 'Success!'})
      },
      (error) => {
        this.dialog.open(ServerErrorDialogComponent, { data: error})
      }
    )
  }

}
