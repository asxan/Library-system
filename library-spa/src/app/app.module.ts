import { AdminGuard } from './helpers/admin.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegComponent } from './reg/reg.component';
import { SearchComponent } from './search/search.component';
import { BookItemComponent } from './book-item/book-item.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { AuthorAddFormComponent } from './admin-page/author-add-form/author-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ServerErrorDialogComponent } from './dialogs/server-error-dialog/server-error-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddBookFormComponent } from './admin-page/add-book-form/add-book-form.component';
import { MatSelectModule } from '@angular/material/select';
import { AddBookEditionsFormComponent } from './admin-page/add-book-editions-form/add-book-editions-form.component';
import { BookPageComponent } from './book-page/book-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './log/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './helpers/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/http.interceptor';

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:id', component: BookPageComponent },
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
        component: AddBookFormComponent
      },
      {
        path: 'add-book-editions-form',
        component: AddBookEditionsFormComponent
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
    AdminPageComponent,
    AddBookFormComponent,
    AddBookEditionsFormComponent,
    BookPageComponent,
    LoginComponent,
    UserPageComponent
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
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }