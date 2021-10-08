import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobService } from '../services/job-service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})

export class JobSearchComponent implements OnInit {

  params = {
    keyword: "",
    page: 0
  };


  totalJobs = 0;
  totalJobsArray: any;
  jobs: any = [];
  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  
  onNextClick(){
    this.params.page+1;
    this.fetchJobs();
  }

  onPreviousClick(){
    this.params.page-1;
    this.fetchJobs();
  }
  onPageNumberClick(i:number){
    this.params.page=i;
    this.fetchJobs();
  }
  fetchJobs() {
    this.spinner.show();
    this.jobService.getJobs(this.params).subscribe(res => {
      this.jobs = res.data.data;
      this.totalJobs = Math.ceil(res.data.totalRecords/10);
      this.totalJobsArray = Array(this.totalJobs).fill(0).map((x, i) => i);
      console.log(this.totalJobsArray)
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.jobs = [];
      console.log(error);

    })
  }

  onSearchJob(event: any) {
    const keyword = event.target.value;
    this.params.keyword = keyword;
    this.params.page=0;
    this.fetchJobs();
  }

}
