import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  @Input() jobTitle:any;
  @Input() jobDescription:any;
  @Input() jobCategory:any;

  public jobApplicationForm: FormGroup = new FormGroup({});
  public show = false;
  constructor() { }

  ngOnInit(): void {
  }

  dialogOpen(){
    this.show = true;
  }
  
  applyJob()
  {

  }

  onSubmit(){
    
  }

  closeDialog(){
    this.show = false;
  }
}
