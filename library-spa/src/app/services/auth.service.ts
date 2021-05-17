import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as jwt from 'jsonwebtoken'
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null = null;

  constructor(private http: HttpClient) {
   }

   loggedIn() {
    if (localStorage.getItem('token')) return true;
    return false;
  }

  register(user: User){
    return this.http.post<any>('http://localhost:3000/api/reg', user, {responseType: 'json'});
  }

  login(user: User){
    return this.http.post<any>('http://localhost:3000/api/login', user)
  }

  logout() {
    this.currentUser = null;
    localStorage.clear();
  }

  getMe() {
    return new Observable<User>(
      observer => {
        if (this.currentUser){
          observer.next(this.currentUser)
        }
        else {
          this.http.get<User>(`http://localhost:3000/api/user/`).subscribe(
          user => {
            this.currentUser = user,
            observer.next(user)
          },
           error => {
             observer.error(error)
           }
        )
        }        
      }
    );
  }
}
