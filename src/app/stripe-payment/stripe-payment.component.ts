import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstService } from '../services/const-service';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { ElementOptions } from 'ngx-stripe/lib/interfaces/element';
import { ElementsOptions } from 'ngx-stripe/lib/interfaces/elements';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {
  homeAddress: FormGroup = new FormGroup({});
  paymentForm: FormGroup = new FormGroup({});
  countries: any;

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
 
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  constructor(
    public fb: FormBuilder,
    public constantService: ConstService,
    private stripeService: StripeService,
    private httpService: HttpClient

  ) { }

  ngOnInit(): void {
    this.countries = this.constantService.country_list;
    this.initForm();
  }

  initForm() {
    
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      name: ['', [Validators.required]],
      studentAdvisorConsultation: ['', [Validators.required]],
      consultationPlusUniversityApplication: ['', [Validators.required]],
      universityApplication: '',

      homeAddress: this.fb.group({
        streetAddressLine1: ['', [Validators.required, Validators.minLength(3)]],
        streetAddressLine2: [''],
        city: ['', [Validators.required, Validators.minLength(3)]],
        stateOrProvince: ['', [Validators.required, Validators.minLength(3)]],
        postalCode: ['', [Validators.required, Validators.minLength(3)]],
        country: ['', [Validators.required, Validators.minLength(3)]],
      })
    })
  }

  onSubmit(){
    console.log(this.paymentForm.value);
    // if(this.paymentForm.invalid){
    //   this.paymentForm.markAllAsTouched();
    // }

    const details: any = this.paymentForm.value;
    this.stripeService
    .createToken(this.card.getCard(), details )
    .subscribe(result => {
      console.log(result);
      // this.httpService.post("http://localhost:5000/stripe/payment", result).subscribe(res=>{
      //   console.log(res);
      // }, error=>{
      //   console.log(error);
      // })
      if (result.token) {
     
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        console.log(result.token.id);
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
      }
    });
  }
}
