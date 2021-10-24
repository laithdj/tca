import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api-service';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpService,
    private apiService: ApiService,
    private router: Router
  ) { }

  public submitApplication(data: any): Observable<any> {
    let url = this.apiService.get("submitApplication");
    return this.http.post(url, data);
  }
}
