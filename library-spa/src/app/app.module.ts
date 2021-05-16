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
import { HttpClientModule } from '@angular/common/http';

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
import { LogComponent } from './log/log.component';
import { UserPageComponent } from './user-page/user-page.component';

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:id', component: BookPageComponent },
  { path: 'reg', component: RegComponent },
  { path: 'login', component: LogComponent },
  { path: 'user', component: UserPageComponent },
  {
    path: 'admintool',
    component: AdminPageComponent,
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
    LogComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }