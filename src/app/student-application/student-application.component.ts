import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { jsPDF } from 'jspdf';
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
  countries: any;
  studentApplicationForm: FormGroup = new FormGroup({});
  educationDetails: FormArray = new FormArray([]);
  educationQualification: FormArray = new FormArray([]);
  englishProficiency: FormArray = new FormArray([]);
  todayDate: Date = new Date();
  formData: FormData = new FormData();

  studentApplication!: any;
  @ViewChild('content', { static: false }) el!: ElementRef;
  //signature
  signatureImg!: string;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 200
  };

  constructor(
    public constantService: ConstService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.clear();
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
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        middleName: '',
      }),
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', [Validators.required, Validators.minLength(3)]],
      countryOfBirth: ['', Validators.required],

      homeAddress: this.fb.group({
        streetAddressLine1: ['', [Validators.required, Validators.minLength(3)]],
        streetAddressLine2: [''],
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
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        date: [new Date(), [Validators.required]],
        signature: '',
        middleName: '',

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
    //clear form data
    this.formData = new FormData();
    if (this.studentApplicationForm.invalid) {
      this.studentApplicationForm.markAllAsTouched();;
      return;
    }
    this.getFormData();
    this.spinner.show();
    if (this.signatureImg) {
      const file = this.DataURIToBlob(this.signatureImg)
      this.formData.append("signature", file, "signature.png");
    }

    //send post req when pdf file is generated
    this.getPdf();
  }

  sendReq() {
    this.spinner.hide();
    console.log(JSON.stringify(this.formData.getAll("declaration")));

    this.studentService.submitApplication(this.formData).subscribe(res => {
      //success
      this.toastr.success("Your application has been submitted.", "Success");
      this.router.navigateByUrl("/");
      this.studentApplicationForm.reset();
      console.log(res);
    }, error => {
      //failure
      console.log(error);
      this.toastr.error(error.error.message || "Something went wrong", "Error");
    });

  }

  getFormData() {
    for (const key in this.studentApplicationForm.value) {
      if (this.studentApplicationForm.value.hasOwnProperty(key)) {
        let a = JSON.stringify(this.studentApplicationForm.value[key]);
        this.formData.set(key, a);
      }
    }


  }

  onPrint() {
    window.print();
  }

  public getPdf() {
    const doc = new jsPDF("p", "pt", "a1");

    doc.html(this.el.nativeElement, {
      callback: (doc) => {
        doc.canvas.pdf;
        this.studentApplication = doc.output('datauristring');
        this.formData.append("studentApplication", this.DataURIToBlob(this.studentApplication), "studentApplication.pdf");
        // this.formData.forEach(el=>console.log(el))
        this.sendReq();
      }

    });

  }


  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
}
