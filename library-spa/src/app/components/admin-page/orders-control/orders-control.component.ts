import { OrderStatus } from './../../../models/orderStatus';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from '../../dialogs/server-error-dialog/server-error-dialog.component';
import { ServerSuccessDialogComponent } from '../../dialogs/server-success-dialog/server-success-dialog.component';
import Order from 'src/app/models/order';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-control',
  templateUrl: './orders-control.component.html',
  styleUrls: ['./orders-control.component.css']
})
export class OrdersControlComponent implements OnInit {

  OrderStatus = OrderStatus;
  orders = new Array<Order>();

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe(
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

  approveOrder(id: string | undefined) {
    if (!id) return;

    this.ordersService.approveOrder(id).subscribe(
      (res) => {
        this.dialog.open(ServerSuccessDialogComponent, { data: 'Success!'})
      },
      (error) => {
        this.dialog.open(ServerErrorDialogComponent, { data: error})
      }
    )
  }

  giveoutOrder(id: string | undefined) {
    if (!id) return;

    this.ordersService.giveoutOrder(id).subscribe(
      (res) => {
        this.dialog.open(ServerSuccessDialogComponent, { data: 'Success!'})
      },
      (error) => {
        this.dialog.open(ServerErrorDialogComponent, { data: error})
      }
    )
  }

  completeOrder(id: string | undefined) {
    if (!id) return;

    this.ordersService.completeOrder(id).subscribe(
      (res) => {
        this.dialog.open(ServerSuccessDialogComponent, { data: 'Success!'})
      },
      (error) => {
        this.dialog.open(ServerErrorDialogComponent, { data: error})
      }
    )
  }

  
}
