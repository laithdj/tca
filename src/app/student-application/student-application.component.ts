import { Component, OnInit } from '@angular/core';
import { ConstServiceService } from '../services/const-service.service';
import {Country} from '@angular-material-extensions/select-country'; 

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})


export class StudentApplicationComponent implements OnInit {
  public countries:any;
  constructor(public constantService: ConstServiceService) { }

  ngOnInit(): void {
    this.countries = this.constantService.country_list;
  }
  onCountrySelected(country: Country) {
    console.log(country);
  }
}
