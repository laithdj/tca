import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstService } from '../services/const-service';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})

export class StudentApplicationComponent implements OnInit {
  public countries:any;
  public studentApplicationForm : FormGroup = new FormGroup({});
  educations!: FormArray;


  constructor(
    public constantService: ConstService
    ) { }

  ngOnInit(): void {
    this.countries = this.constantService.country_list;
    console.log(this.countries)
    this.initForm();
  }

  initForm() {
    this.studentApplicationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      middleName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required, Validators.minLength(3)]),
      countryOfBirth: new FormControl('', [Validators.required]),

      homeAddress: new FormGroup({
        streetAddressLine1: new FormControl('', [Validators.required, Validators.minLength(3)]),
        streetAddressLine2: new FormControl('', [Validators.required, Validators.minLength(3)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3)]),
        stateOrProvince: new FormControl('', [Validators.required, Validators.minLength(3)]),
        postalCode: new FormControl('', [Validators.required,  Validators.minLength(3)]),
        // country: new FormControl('', [Validators.required]),
      }),
      contact: new FormControl('', [Validators.required,  Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),

      guardian: new FormGroup({
        guardianName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        guardianRelationship: new FormControl('', [Validators.required]),
        guardianContact: new FormControl('', [Validators.required, Validators.minLength(6)]),
        guardianAddress: new FormControl('', [Validators.required, Validators.minLength(3)]),
      }),

      applicationDetails: new FormGroup({
        intendedDegree: new FormControl('', [Validators.required,  Validators.minLength(3)]),
        propoosedStartDate: new FormControl('', [Validators.required]), //March 2022
        tutionFeeMode: new FormControl('', [Validators.required]),
        sponser: new FormControl('', [Validators.required, Validators.minLength(3)]),
      }),

      //should be form array
      educationDetails: new FormGroup({
        education: new FormArray([]),
        instituteName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        country: new FormControl('', [Validators.required]), 
        attendedFrom: new FormControl('', [Validators.required])
      }),
      //should be form array
      educationQualification: new FormGroup({
        qualifications: new FormArray([]),
        subject: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]), 
        grade: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }),
      //should be form array
      englishProficiency: new FormGroup({
        certificates: new FormArray([]),
        certificateName: new FormControl('', [Validators.required]), //IETS, TOEFEL
        grade: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }),
      statement: new FormControl('', [Validators.required]),
      declaration: new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]), 
        middleName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        signature: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }),
    });
  }

  createItem(): FormGroup {
    return new FormGroup({
      institue: new FormControl(),
      subject: new FormControl(),
      attenedFrom: new FormControl(),
    });
  }
  
  addItem(): void {
    this.educations = this.studentApplicationForm.get('educations') as FormArray;
    this.educations.push(this.createItem());
  }
  onSubmit(){
    console.log(this.studentApplicationForm.value)
  }
}
