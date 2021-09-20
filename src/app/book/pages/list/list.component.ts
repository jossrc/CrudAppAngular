import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  listOfBooks: Book[] = [
    {
      id: 1,
      title: 'El mejor libro',
      category: 'Autoayuda',
      pages: 325
    },
    {
      id: 2,
      title: 'Pepito',
      category: 'Terror',
      pages: 521
    },
    {
      id: 3,
      title: 'Canción de Hielo y Fuego',
      category: 'Fantasía',
      pages: 1250
    },
    {
      id: 4,
      title: 'Harry Potter',
      category: 'Fantasía',
      pages: 670
    },
    {
      id: 5,
      title: 'Las Aventuras de Tintin',
      category: 'Drama',
      pages: 122
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  removeBookById(id: number) {
    console.log(`Se eliminó el libro con id ${id}`);
  }

}
