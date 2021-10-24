import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/job-service';
import swal from 'sweetalert';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { AuthService } from '@auth0/auth0-angular';
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
  swal: SweetAlert = _swal as any;
  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.auth.user$.subscribe(res => {
      console.log(res);
    })
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
    this.spinner.show();
    this.auth.isAuthenticated$.subscribe(res => {
      this.spinner.hide();
      if(res=== true){
        this.show = true;
      }else{
        this.notAuthenticated();
      }
    }, error => {
      this.spinner.hide();
      console.log(error);
    })
  }

  notAuthenticated(){
    swal({
      title: "You are not Logged In!",
      text: "To apply job, please login first !",
      icon: "warning",
      buttons: ["Cancel", "Login"],
      dangerMode: true,
    })
    .then((res) => {
      if (res) {
        // login page redirect
        this.auth.loginWithRedirect();
      } else {
        //cancel
      }
    });
  }
  
  async isAuthenticated() {
    this.auth.isAuthenticated$.subscribe(res => {
      return res;
    })

  }

  onSubmit() {
    if(this.jobApplyForm.invalid){
      this.jobApplyForm.markAllAsTouched();
      return;
    }
    this.spinner.show();
    const formData: FormData = new FormData();
    formData.append("jobId", this.jobId);
    formData.append("name", this.getFullName());
    formData.append("email", this.jobApplyForm.get("email")?.value);
    formData.append("resume", this.jobApplyForm.get("resume")?.value);
    this.jobService.applyJob(formData).subscribe(res => {
      this.spinner.hide();
      this.toastService.success("Your Application has been submitted.", "Success");
      this.show = false;
      this.jobApplyForm.reset();
      console.log(res);
    }, error => {
      this.spinner.hide();
      this.toastService.error(error.error.message || "Something went wrong", "Error");
      console.log(error);
    })

  }

  getFullName() {
    let fullName = `${this.jobApplyForm.get("firstName")?.value}` + " " +
    `${this.jobApplyForm.get("middleName")?.value}` + " " +
    `${this.jobApplyForm.get("lastName")?.value}`;
    return fullName;
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
