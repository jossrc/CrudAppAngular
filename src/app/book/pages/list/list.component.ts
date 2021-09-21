import { Component, OnInit } from '@angular/core';
import { Book, Response } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .view-link {
        font-weight: 400;
        text-decoration: none;
        color: rgb(118, 148, 233);
      }

      .view-link:hover {
        text-decoration: underline;
        color: rgb(176, 193, 238);
      }
    `,
  ],
})
export class ListComponent implements OnInit {
  listOfBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  removeBookById(id: number) {
    this.bookService.deleteBook(id).subscribe((resp: Response) => {
      this.loadBooks();
      console.log(resp.message);
    });
  }

  loadBooks() {
    this.bookService
      .getBooks()
      .subscribe((books: Book[]) => (this.listOfBooks = books));
  }
}
