import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-undergraduates',
  templateUrl: './undergraduates.component.html',
  styleUrls: ['./undergraduates.component.css']
})
export class UndergraduatesComponent implements OnInit {

  constructor() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
   }

  ngOnInit(): void {
  }

}
