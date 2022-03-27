import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aucklanduni',
  templateUrl: './aucklanduni.component.html',
  styleUrls: ['./aucklanduni.component.css']
})
export class AucklanduniComponent implements OnInit {

  constructor() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
   }

  ngOnInit(): void {

  }

}
