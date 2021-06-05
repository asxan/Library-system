import { AuthorsResolver } from './resolvers/authors.resolver';
import { GenreResolver } from './resolvers/genre.resolver';
import { AdminGuard } from './helpers/admin.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegComponent } from './components/reg/reg.component';
import { SearchComponent } from './components/search/search.component';
import { BookItemComponent } from './components/search/book-item/book-item.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { AuthorAddFormComponent } from './components/admin-page/author-add-form/author-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from './components/dialogs/server-error-dialog/server-error-dialog.component';
import { ServerSuccessDialogComponent } from './components/dialogs/server-success-dialog/server-success-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddBookFormComponent } from './components/admin-page/add-book-form/add-book-form.component';
import { MatSelectModule } from '@angular/material/select';
import { AddBookEditionsFormComponent } from './components/admin-page/add-book-editions-form/add-book-editions-form.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/log/login.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './helpers/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/http.interceptor';
import { TextHightlightPipe } from './helpers/text-hightlight.pipe';
import { OrdersControlComponent } from './components/admin-page/orders-control/orders-control.component';

const appRoute: Routes = [
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
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegComponent,
    SearchComponent,
    BookItemComponent,
    AuthorAddFormComponent,
    ServerErrorDialogComponent,
    ServerSuccessDialogComponent,
    AdminPageComponent,
    AddBookFormComponent,
    AddBookEditionsFormComponent,
    BookPageComponent,
    LoginComponent,
    UserPageComponent,
    TextHightlightPipe,
    OrdersControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }