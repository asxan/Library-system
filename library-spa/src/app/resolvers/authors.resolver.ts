import { ServerErrorDialogComponent } from './../components/dialogs/server-error-dialog/server-error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { BooksService } from './../services/books.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import Author from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsResolver implements Resolve<Author[]> {

  constructor(private booksService: BooksService, private dialog: MatDialog, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Author[]> {
    return this.booksService.getAuthors().pipe(
      catchError(
        error => {
          this.dialog.open(ServerErrorDialogComponent, { data: 'Problem retrieving data' });
          this.router.navigate(['/']);
          return of([]);
        }
      )
    )
  }
}
