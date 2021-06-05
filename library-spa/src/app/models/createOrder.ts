export default class CreateOrderModel {
  book: string;
  edition: string;
  days: number;

  constructor(book: string, edition: string, days: number) {
    this.book = book;
    this.edition = edition;
    this.days = days
  }
}

