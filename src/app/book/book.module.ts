import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { BookRoutingModule } from './book-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './pages/view/view.component';

@NgModule({
  declarations: [
    HomeComponent,
    BookComponent,
    AddComponent,
    ListComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BookModule { }
