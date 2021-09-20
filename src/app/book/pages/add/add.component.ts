import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    .bg-gray {
      background: #F4F4F4;
      border: none!important;
      border-radius: 20px;
    }    
    `
  ]
})
export class AddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
