import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job-service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  @Input() jobTitle:any;
  @Input() jobDescription:any;
  @Input() jobCategory:any;

  public jobApplyForm: FormGroup = new FormGroup({});
  public show = false;
  constructor(
    private fb: FormBuilder,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.jobApplyForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
    });
  }

  dialogOpen(){
    this.show = true;
  }
  
  applyJob()
  {

  }

  onSubmit(){
    const data: any = this.jobApplyForm.value;
    console.log(this.jobApplyForm.value);
    this.jobService.applyJob(data).subscribe(res=>{
      console.log(res);
    }, error=>{
      console.log(error);
    })

  }

  closeDialog(){
    this.show = false;
  }
}
