import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
