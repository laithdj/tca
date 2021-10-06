import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job-service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {

  params = new HttpParams();
  // public jobs = [{
  //   jobTitle: 'Job1',
  //   jobDescription:'This is Description for Job 1.',
  //   jobCategory: "Teaching"
  // },
  // {
  //   jobTitle: 'Job2',
  //   jobDescription:'This is Description for Job 2.',
  //   jobCategory:"Doctor"
  // }]
  jobs: any;
  constructor(
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.fetchJobs();
  }


  fetchJobs() {
    this.jobService.getJobs(this.params).subscribe(res => {
      this.jobs = res.data.data;
      console.log(res);
    }, error => {
      this.jobs = [];

      console.log(error);
    })
  }

  onSearchJob(event: any){
    const keyword = event.target.value;
    this.params.append('keyword', keyword);
    console.log(this.params.toString)
    this.fetchJobs();
  }

}
