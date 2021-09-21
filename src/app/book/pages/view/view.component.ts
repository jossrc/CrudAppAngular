import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  Author,
  Book,
  Category,
  ResponseBook,
} from '../../interfaces/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
    `
      .bg-gray {
        background: #f4f4f4;
        border: none !important;
        border-radius: 20px;
      }
    `,
  ],
})
export class ViewComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  public authors: Author[] = [];
  public categories: Category[] = [];

  book: Book = {
    Id: 0,
    Isbn: '',
    Titulo: '',
    IdAutor: -1,
    IdCategoria: -1,
    Paginas: 0,
    Stock: 0,
    Precio: 0,
    Descripcion: '',
  };

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookService
      .getAuthors()
      .subscribe((authors: Author[]) => (this.authors = authors));

    this.bookService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));

    if (!this.router.url.includes('ver')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.bookService.getBookById(id);
        })
      )
      .subscribe((respBook: ResponseBook) => {
        if (!respBook.book) {
          this.router.navigate(['/libros/listado']);
        }
        console.log(respBook);
        this.loadData(respBook);
      });
  }

  loadData(respBook: ResponseBook) {
    if (respBook) {
      this.book = { ...respBook.book! };
    }
  }
}
