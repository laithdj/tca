import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api-service';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpService,
    private apiService: ApiService,
    private router: Router
  ) { }

  public getJobs(): Observable<any> {
    let url = this.apiService.get("getJobs");
    return this.http.get(url);
  }

  public applyJob(data: any): Observable<any> {
    let url = this.apiService.get("getJobs");
    return this.http.post(url, data);
  }
}
