import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Book from '../models/book';
import Genre from '../models/genre';
import Author from '../models/author';
import bookEdition from '../models/bookEditions';
import user from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http : HttpClient) { }
  
  getGenres(){
    return this.http.get<Genre[]>('http://localhost:3000/api/genres');
  }
  
  getBooks(params?: any){
    return this.http.get<Book[]>('http://localhost:3000/api/books',{params});
  }

  getBook(id: string){
    return this.http.get<Book>(`http://localhost:3000/api/books/${id}`);
  }

  addBook(book: Book){
    return this.http.post('http://localhost:3000/api/books', book, {responseType: 'text'});
  }

  addAuthor(author: Author){
    return this.http.post('http://localhost:3000/api/authors', author, {responseType: 'text'});
  }
  
  getAuthors(){
    return this.http.get<Author[]>('http://localhost:3000/api/authors');
  }

  addBookEdition(bookEdition: bookEdition){
    return this.http.post('http://localhost:3000/api/editions', bookEdition, {responseType: 'text'});
  }

  register(user: user){
    return this.http.post('http://localhost:3000/api/reg', user, {responseType: 'text'});
  }

  login(user: user){
    return this.http.post('http://localhost:3000/api/login', user, {responseType: 'text'});
  }
}

