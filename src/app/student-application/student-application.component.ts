import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConstService } from '../services/const-service';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.scss']
})

export class StudentApplicationComponent implements OnInit {
  public countries: any;
  public studentApplicationForm: FormGroup = new FormGroup({});
  educationDetails: FormArray = new FormArray([]);
  educationQualification: FormArray = new FormArray([]);
  englishProficiency: FormArray = new FormArray([]);
  todayDate: Date = new Date();

  //signature
  signatureImg!: string;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };
  // -------------------
  constructor(
    public constantService: ConstService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private studentService: StudentService
  ) { }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }


  ngOnInit(): void {
    this.countries = this.constantService.country_list;
    this.initForm();
  }

  initForm() {
    this.studentApplicationForm = this.fb.group({

      name: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: [''],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
      }),
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', [Validators.required, Validators.minLength(3)]],
      countryOfBirth: ['', Validators.required],

      homeAddress: this.fb.group({
        streetAddressLine1: ['', [Validators.required, Validators.minLength(3)]],
        streetAddressLine2: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        stateOrProvince: ['', [Validators.required, Validators.minLength(3)]],
        postalCode: ['', [Validators.required, Validators.minLength(3)]],
        country: ['', [Validators.required, Validators.minLength(3)]],
      }),

      contact: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],

      guardian: this.fb.group({
        guardianName: ['', [Validators.required, Validators.minLength(3)]],
        guardianRelationship: ['', [Validators.required, Validators.minLength(3)]],
        guardianContact: ['', [Validators.required, Validators.minLength(6)]],
        guardianAddress: '', //optional
      }),

      applicationDetails: this.fb.group({
        intendedDegree: ['', [Validators.required, Validators.minLength(3)]],
        propoosedStartDate: ['', [Validators.required, Validators.minLength(3)]], //March 2022
        tutionFeeMode: ['', [Validators.required]],
        sponser: '' //optional
      }),

      educationDetails: this.fb.array([]),
      educationQualification: this.fb.array([]),
      englishProficiency: this.fb.array([]),

      statement: ['', [Validators.required, Validators.minLength(6)]],

      declaration: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        signature: ['', Validators.required],
        date: [new Date(), [Validators.required]],
      }),
    });
    this.aadEducation();
    this.addQualification();
    this.addEngCertificate();
  }

  getEducationDetailGroup() {
    return this.fb.group({
      instituteName: ['', Validators.required],
      country: ['', Validators.required],
      attendedFrom: ['', Validators.required]
    })
  }

  getEducationQualificationGroup() {
    return this.fb.group({
      subject: ['', Validators.required],
      level: ['', Validators.required],
      grade: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  getEnglishProficiencyGroup() {
    return this.fb.group({
      certificateName: ['', Validators.required],
      grade: ['', Validators.required],
      date: ['', Validators.required],
    })
  }


  aadEducation() {
    this.educationDetails = this.studentApplicationForm.get('educationDetails') as FormArray;
    this.educationDetails.push(this.getEducationDetailGroup());
  }

  removeEducation(index: number) {
    this.educationDetails = this.studentApplicationForm.get('educationDetails') as FormArray;
    this.educationDetails.removeAt(index);
  }

  addQualification() {
    this.educationQualification = this.studentApplicationForm.get('educationQualification') as FormArray;
    this.educationQualification.push(this.getEducationQualificationGroup());
  }

  removeQualification(index: number) {
    this.educationQualification = this.studentApplicationForm.get('educationQualification') as FormArray;
    this.educationQualification.removeAt(index);

  }

  addEngCertificate() {
    this.englishProficiency = this.studentApplicationForm.get('englishProficiency') as FormArray;
    this.englishProficiency.push(this.getEnglishProficiencyGroup());
  }

  removeEngCertificate(index: number) {
    this.englishProficiency = this.studentApplicationForm.get('englishProficiency') as FormArray;
    this.englishProficiency.removeAt(index);
  }

  get educationDetailGroups() {
    return this.studentApplicationForm.get('educationDetails') as FormArray;
  }

  get educationQualificationGroups() {
    return this.studentApplicationForm.get('educationQualification') as FormArray;
  }

  get englishProficiencyGroups() {
    return this.studentApplicationForm.get('englishProficiency') as FormArray;
  }

  onSubmit() {
    console.log(this.studentApplicationForm.value);

    // if(this.studentApplicationForm.invalid){
    //   this.studentApplicationForm.markAllAsTouched();;
    //   return;
    // }
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();

      if (this.studentApplicationForm.invalid) {
        this.studentApplicationForm.markAllAsTouched();
        this.toastr.success("Validation Error.", "Error");
      } else {
        this.toastr.success("Your application has been submitted.", "Success");
      }


    }, 5000);

    this.studentService.submitApplication(this.studentApplicationForm.value).subscribe(res=>{
      //success
    }, error=>{
      //failure
    })

  }
}
