import Book  from './book';
import BooksEdition from './bookEditions';
import { OrderStatus } from './orderStatus';
import User from './user';

export default class Order {
  _id?: string;
  book?: Book;
  edition?: BooksEdition;
  user?: User;
  status?: OrderStatus 
  orderDate?: string;
  endDate?: string;
}