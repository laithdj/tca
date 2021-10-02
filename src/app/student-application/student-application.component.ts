import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstService } from '../services/const-service';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})

export class StudentApplicationComponent implements OnInit {
  public countries:any;
  public studentApplicationForm : FormGroup = new FormGroup({});

  constructor(
    public constantService: ConstService
    ) { }

  ngOnInit(): void {
    this.countries = this.constantService.country_list;
    this.initForm();
  }
  initForm() {
    this.studentApplicationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      middleName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      countryOfBirth: new FormControl('', [Validators.required]),
      //address will be here
      homeAddress: new FormGroup({
        streetAddressLine1: new FormControl('', [Validators.required]),
        streetAddressLine2: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        stateOrProvince: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      }),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      guardian: new FormGroup({
        name: new FormControl('', [Validators.required]),
        relationship: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
      }),
      applicationDetails: new FormGroup({
        intendedDegree: new FormControl('', [Validators.required]),
        propoosedStartDate: new FormControl('', [Validators.required]), //March 2022
        tutionFeeMode: new FormControl('', [Validators.required]),
        sponser: new FormControl('', [Validators.required]),
      }),

      //should be form array
      educationDetails: new FormGroup({
        instituteName: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]), 
        attendedFrom: new FormControl('', [Validators.required])
      }),
      //should be form array
      educationQualification: new FormGroup({
        subject: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]), 
        grade: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }),
      //should be form array
      englishProficiency: new FormGroup({
        certificateName: new FormControl('', [Validators.required]), //IETS, TOEFEL
        grade: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }),
      statement: new FormControl('', [Validators.required]),
      declaration: new FormGroup({
        firstName: new FormControl('', [Validators.required]), //IETS, TOEFEL
        middleName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        signature: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }),
    });
  }
  onCountrySelected(country: string) {
    console.log(country);
  }

  onSubmit(){

  }
}
