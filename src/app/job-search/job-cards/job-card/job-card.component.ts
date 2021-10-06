import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/job-service';
import { Job } from 'src/app/shared/shared/models/Job.model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  @Input() jobTitle: any;
  @Input() jobDescription: any;
  @Input() jobCategory: any;
  @Input() jobId: any;
  public jobApplyForm: FormGroup = new FormGroup({});
  public show = false;
  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService
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
      resume: [Validators.required],
    });
  }

  dialogOpen() {
    this.show = true;
  }

  onSubmit() {
    this.spinner.show();
    const data: any = this.jobApplyForm.value;
    const formData: FormData = new FormData();
    formData.append("jobId", this.jobId);
    formData.append("name", this.jobApplyForm.get("firstName")?.value);
    // formData.append("middleName", this.jobApplyForm.get("middleName")?.value);
    // formData.append("lastName", this.jobApplyForm.get("lastName")?.value);
    formData.append("email", this.jobApplyForm.get("email")?.value);
    formData.append("resume", this.jobApplyForm.get("resume")?.value);
    this.jobService.applyJob(formData).subscribe(res => {
      this.spinner.hide();
      this.toastService.success("Your Application has been submitted.", "Success");
      console.log(res);
    }, error => {
      this.spinner.hide();
      this.toastService.error("Something went wrong", "Error");
      console.log(error);
    })

  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.jobApplyForm.patchValue({
        resume: event.target.files[0],
      })
    }
  }


  closeDialog() {
    this.show = false;
  }
}
