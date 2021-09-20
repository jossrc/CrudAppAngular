import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    BookComponent,
    AddComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
