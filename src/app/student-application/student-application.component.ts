import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  todayDate: Date = new Date();

  constructor(
    public constantService: ConstService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.countries = this.constantService.country_list;
    this.initForm();
  }

  initForm() {
    this.studentApplicationForm = this.fb.group({

      name: this.fb.group({
        firstName: ['' ,[Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: ['',[Validators.required, Validators.minLength(3)]],
      }),
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['',[Validators.required, Validators.minLength(3)]],
      countryOfBirth: ['', Validators.required],

      homeAddress: this.fb.group({
        streetAddressLine1: ['',[Validators.required, Validators.minLength(3)]],
        streetAddressLine2: ['',[Validators.required, Validators.minLength(3)]],
        city: ['',[Validators.required, Validators.minLength(3)]],
        stateOrProvince: ['',[Validators.required, Validators.minLength(3)]],
        postalCode: ['',[Validators.required, Validators.minLength(3)]],
        country: ['',[Validators.required, Validators.minLength(3)]],
      }),

      contact: ['',[Validators.required, Validators.minLength(6)]],
      email: ['',[Validators.required, Validators.email]],

      guardian: this.fb.group({
        guardianName: ['',[Validators.required, Validators.minLength(3)]],
        guardianRelationship: ['',[Validators.required, Validators.minLength(3)]],
        guardianContact: ['',[Validators.required, Validators.minLength(6)]],
        guardianAddress: ['',[Validators.required, Validators.minLength(3)]],
      }),

      applicationDetails: this.fb.group({
        intendedDegree: ['',[Validators.required, Validators.minLength(3)]],
        propoosedStartDate: ['',[Validators.required, Validators.minLength(3)]], //March 2022
        tutionFeeMode: ['',[Validators.required]],
        sponser: ['',[Validators.required, Validators.minLength(3)]],
      }),

      //should be form array
      educationDetails: this.fb.array([this.getEducationDetailGroup()]),
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

      statement: ['',[Validators.required, Validators.minLength(6)]],

      declaration: this.fb.group({
        firstName: ['',[Validators.required, Validators.minLength(3)]],
        middleName: ['',[Validators.required, Validators.minLength(3)]],
        lastName: ['',[Validators.required, Validators.minLength(3)]],
        signature: ['',Validators.required],
        date: ['',[Validators.required]],
      }),
    });
  }

  getEducationDetailGroup(){
     return this.fb.group({
      instituteName: ['', Validators.required],
      country: ['', Validators.required], 
      attendedFrom: ['', Validators.required]
    })
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

  get educationDetailGroups(){
    return this.studentApplicationForm.get('educationDetails') as FormArray;
  }
  onSubmit(){
    console.log(this.studentApplicationForm.value)
  }
}
