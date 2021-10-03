import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  @Input() jobTitle:any;
  @Input() jobDescription:any;
  @Input() jobCategory:any;

  constructor() { }

  ngOnInit(): void {
  }

}
