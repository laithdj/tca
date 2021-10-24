import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup = new FormGroup({});
  public imageURL = "../../assets/user-icon.png";
  phone: string = "";
  email: string = "";
  isProfileExist: boolean = false;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private userService: UserService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.auth.user$.subscribe(user => {
      this.email = user?.email || "";
      this.getProfile();

      if (!user) {
        this.email = "";
      }
    });


  }

  urlToBlob(image: string, resume: string) {
    fetch(image)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        this.profileForm.patchValue({
          image: blob,
        });
      });

      fetch(resume)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        this.profileForm.patchValue({
          resume: blob,
        });
      });

  }
  getProfile() {
    this.spinner.show();
    this.userService.getProfile(this.email).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.isProfileExist = true;
      this.imageURL = res.data.image;
      this.profileForm.patchValue({
        phone: res.data.phone
      })
      this.urlToBlob(res.data.image, res.data.resume);

      // this.res
    }, error => {
      this.spinner.hide();
      this.isProfileExist = false;
    })
  }

  initForm() {
    this.profileForm = this.fb.group({
      resume: '',
      image: '',
      phone: ''
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.profileForm.patchValue({
        resume: event.target.files[0],
      })
    }
  }

  onimageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      //show preview
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      }
      //patch to form
      this.profileForm.patchValue({
        image: event.target.files[0],
      })
    }
  }


  onSubmit() {
    const formData: FormData = new FormData();
    formData.append("phone", this.profileForm.get("phone")?.value);
    formData.append("resume", this.profileForm.get("resume")?.value);
    formData.append("image", this.profileForm.get("image")?.value);
    formData.append("email", this.email);
    this.spinner.show();

    if (this.isProfileExist) {
      this.userService.updateProfile(formData).subscribe(res => {
        this.spinner.hide();
        this.toastService.success("Your Profile Created successfully.", "Success");

      }, error => {
        this.spinner.hide();
        this.toastService.error(error.error.message || "Something went wrong", "Error");
      })
    } else {
      this.userService.createProfile(formData).subscribe(res => {
        this.toastService.success("Your Profile Created successfully.", "Success");
        this.spinner.hide();

      }, error => {
        this.spinner.hide();
        this.toastService.error(error.error.message || "Something went wrong", "Error");

      })
    }

  }


}
