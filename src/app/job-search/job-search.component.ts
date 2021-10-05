import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job-service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {

  public jobs = [{
    jobTitle: 'Job1',
    jobDescription:'This is Description for Job 1.',
    jobCategory: "Teaching"
  },
  {
    jobTitle: 'Job2',
    jobDescription:'This is Description for Job 2.',
    jobCategory:"Doctor"
  }]

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.fetchJobs();
  }


  fetchJobs() {
    this.jobService.getJobs().subscribe(res=>{
      // this.jobs = res.data;
    }, error=>{

    })
  }

}
