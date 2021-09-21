import { Component, OnInit } from '@angular/core';
import {
  Author,
  Book,
  Category,
  ResponseBook,
} from '../../interfaces/book.interface';
import { BookService } from '../../services/book.service';

import { switchMap } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
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
export class AddComponent implements OnInit {
  public authors: Author[] = [];
  public categories: Category[] = [];
  public bookId: number = -1;

  public isActive: boolean = false;
  public isError: boolean = false;
  public typeAlert: string = 'alert-success';
  public messageAlert: string = '';

  public myBookForm: FormGroup = this.formBuilder.group({
    Isbn: [
      '',
      [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    Titulo: ['', [Validators.required, Validators.maxLength(250)]],
    Descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    Paginas: [
      '',
      [
        Validators.required,
        Validators.pattern('^([-]?)[0-9]+$'),
        Validators.min(0),
      ],
    ],
    Stock: [
      '',
      [
        Validators.required,
        Validators.pattern('^([-]?)[0-9]+$'),
        Validators.min(0),
      ],
    ],
    Precio: [
      '',
      [
        Validators.required,
        Validators.pattern('^([-]?)[0-9]{0,8}[.]?[0-9]{1,4}$'),
        Validators.min(0),
      ],
    ],
    IdAutor: ['', [Validators.required]],
    IdCategoria: ['', [Validators.required]],
  });

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get isbnErrorMsg(): string {
    const errors = this.myBookForm.get('Isbn')?.errors;

    if (errors?.required) {
      return 'El campo ISBN es obligatorio';
    } else if (errors?.pattern) {
      return 'El ISBN solo debe contener números';
    } else if (errors?.minlength || errors?.maxlength) {
      return 'El ISBN debe tener 13 carácteres numéricos';
    }

    return '';
  }

  get titleErrorMsg(): string {
    const errors = this.myBookForm.get('Titulo')?.errors;

    if (errors?.required) return 'El Título es obligatorio';

    if (errors?.maxlength)
      return 'El Título debe tener como máximo 250 caracteres';

    return '';
  }

  get pagesErrorMsg(): string {
    const errors = this.myBookForm.get('Paginas')?.errors;

    if (errors?.required) {
      return 'El campo es obligatorio';
    } else if (errors?.pattern) {
      return 'El campo debe ser numérico';
    } else if (errors?.min) {
      return 'El campo acepta numéros mayores o iguales a 0';
    }

    return '';
  }

  get stockErrorMsg(): string {
    const errors = this.myBookForm.get('Stock')?.errors;

    if (errors?.required) {
      return 'El campo es obligatorio';
    } else if (errors?.pattern) {
      return 'El campo debe ser numérico';
    } else if (errors?.min) {
      return 'El campo acepta numéros mayores o iguales a 0';
    }

    return '';
  }

  get priceErrorMsg(): string {
    const errors = this.myBookForm.get('Precio')?.errors;

    if (errors?.required) {
      return 'El campo es obligatorio';
    } else if (errors?.pattern) {
      return 'El campo debe ser numérico y positivo';
    } else if (errors?.min) {
      return 'El campo acepta numéros mayores o iguales a 0';
    }

    return '';
  }

  get descriptionErrorMsg(): string {
    const errors = this.myBookForm.get('Descripcion')?.errors;

    if (errors?.required) return 'La descripción es obligatoria';

    if (errors?.maxlength)
      return 'La descripción debe tener como máximo 1000 caracteres';

    return '';
  }

  ngOnInit(): void {
    this.bookService
      .getAuthors()
      .subscribe((authors: Author[]) => (this.authors = authors));

    this.bookService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.bookId = id;
          return this.bookService.getBookById(id);
        })
      )
      .subscribe((respBook: ResponseBook) => {
        if (!respBook.book) {
          this.router.navigate(['/libros/listado']);
        }
        this.loadData(respBook);
      });
  }

  saveData(): void {
    this.myBookForm.markAllAsTouched();
    if (this.myBookForm.invalid) {
      return;
    }

    let data = this.myBookForm.value;
    let book: Book = {
      Id: this.bookId,
      ...data,
    };

    if (this.bookId === -1 && !this.router.url.includes('editar')) {
      this.bookService.addNewBook(book).subscribe((resp) => {
        this.messageAlert = resp.message;
        if (resp.success) {
          this.isError = false;
          this.typeAlert = 'alert-success';
        } else {
          this.isError = true;
          this.typeAlert = 'alert-danger';
        }
        this.isActive = true;
        this.myBookForm.reset();
      });
    } else {
      this.bookService.updateBook(book).subscribe((resp) => {
        this.messageAlert = resp.message;
        if (resp.success) {
          this.isError = false;
          this.typeAlert = 'alert-success';
        } else {
          this.isError = true;
          this.typeAlert = 'alert-danger';
        }
        this.isActive = true;
      });
    }
  }

  loadData(respBook: ResponseBook) {
    if (respBook) {
      let { Id, ...dataForm } = respBook.book!;
      this.myBookForm.setValue({
        ...dataForm,
      });
    }
  }

  isValidField(field: string) {
    return (
      this.myBookForm.get(field)?.invalid && this.myBookForm.get(field)?.touched
    );
  }

  validClass(field: string, initialClass: string): string {
    if (this.myBookForm.get(field)?.touched) {
      if (this.myBookForm.get(field)?.invalid) {
        initialClass += ' is-invalid';
      } else {
        initialClass += ' is-valid';
      }
    }

    return initialClass;
  }
}
