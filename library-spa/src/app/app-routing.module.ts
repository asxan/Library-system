import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookEditionsFormComponent } from './components/admin-page/add-book-editions-form/add-book-editions-form.component';
import { AddBookFormComponent } from './components/admin-page/add-book-form/add-book-form.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthorAddFormComponent } from './components/admin-page/author-add-form/author-add-form.component';
import { OrdersControlComponent } from './components/admin-page/orders-control/orders-control.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/log/login.component';
import { RegComponent } from './components/reg/reg.component';
import { SearchComponent } from './components/search/search.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AdminGuard } from './helpers/admin.guard';
import { AuthGuard } from './helpers/auth.guard';
import { AuthorsResolver } from './resolvers/authors.resolver';
import { GenreResolver } from './resolvers/genre.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'search',
    component: SearchComponent,
    resolve: {genres: GenreResolver} },
  { 
    path: 'search/:id', 
    component: BookPageComponent,
    resolve: {genres: GenreResolver}
  },
  { path: 'registration', component: RegComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
  {
    path: 'admintool',
    component: AdminPageComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'add-author-form',
        component: AuthorAddFormComponent
      },
      {
        path: 'add-book-form',
        component: AddBookFormComponent,
        resolve: { genres: GenreResolver, authors: AuthorsResolver }
      },
      {
        path: 'add-book-editions-form',
        component: AddBookEditionsFormComponent
      },
      {
        path: 'orders-control',
        component: OrdersControlComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
