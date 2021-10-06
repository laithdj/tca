import { HttpParams } from '@angular/common/http';
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

  public getJobs(params: HttpParams): Observable<any> {
    let url = this.apiService.get("getJobs");
    console.log(params.toString)
    return this.http.get(url, params);
  }

  public applyJob(data: any): Observable<any> {
    let url = this.apiService.get("applyJob");
    return this.http.post(url, data);
  }
}
