import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreateOrderModel from '../models/createOrder';
import Order from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }  

  order(order: CreateOrderModel) {
    return this.http.post('http://localhost:3000/api/order', order)
  }

  getUserOrders(id: string) {
    return this.http.get<Order[]>(`http://localhost:3000/api/orders/${id}`);
  }

  getAllOrders() {
    return this.http.get<Order[]>(`http://localhost:3000/api/orders`);
  }

  cancelOrder(id: string) {
    return this.http.put(`http://localhost:3000/api/order/cancel/${id}`, null);
  }

  approveOrder(id: string) {
    return this.http.put(`http://localhost:3000/api/order/approve/${id}`, null);
  }

  giveoutOrder(id: string) {
    return this.http.put(`http://localhost:3000/api/order/giveout/${id}`, null);
  }

  completeOrder(id: string) {
    return this.http.put(`http://localhost:3000/api/order/complete/${id}`, null);
  }
}
