import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Author from '../models/author';
import Book from '../models/book';

@Injectable({
  providedIn: 'root'
})
export default class StatsService {

  constructor(private http: HttpClient) { }

  getTopBooks(count?: number){
    return this.http.get<Book[]>('http://localhost:3000/api/stats/topbooks')
  }

  getTopAuthors(count?: number){
    return this.http.get<Author[]>('http://localhost:3000/api/stats/topauthors')
  }
}
