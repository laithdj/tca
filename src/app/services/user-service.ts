import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { User } from "../shared/shared/models/User.model";
import { ApiService } from "./api-service";
import { HttpService } from "./http-service";
@Injectable({
  providedIn: "root",
})
export class UserService {
  public user!: User;
  public loggingOutFromBuilder: boolean = false;
  public roleUpdated = new Subject<any>();
  public forceLogout: boolean = false;

  constructor(
    private http: HttpService,
    private apiService: ApiService,
    private router: Router
  ) { }

  public refreshToken(data: any): Observable<any> {
    let url = this.apiService.get("getRefreshToken");
    return this.http.post(url, data);
  }

  public getAuthToken(): any {
    // get token from browser session storage and return
    return localStorage.getItem("jwt");
  }

  public logoutRedirect(): void {
    // close all opened dialogs

    // remove items from session storage
    localStorage.clear();

    // show login screen
    this.router.navigate(["login"]);
  }

  public loginUser(loginData: any): Observable<any> {
    return this.http.post(this.apiService.get("login"), loginData);
  }

  public updatePassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updatePassword"), data);
  }

  public logoutUser(): Observable<any> {
    return this.http.post(this.apiService.get("logout"), {});
  }

  public forgotPassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("forgotPassword"), data);
  }

  public resetPassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("resetPassword"), data);
  }

  public changePassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("changePassword"), data);
  }

  public getUserProfile(): Observable<any> {
    return this.http.get(this.apiService.get("getUserProfile"));
  }
  public updateUserProfile(data: any): Observable<any> {
    return this.http.put(this.apiService.get("updateUserProfile"), data);
  }

}