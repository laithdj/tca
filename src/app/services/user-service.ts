import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
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
    private router: Router,
    private auth: AuthService
  ) { }

  
  // public logoutRedirect(): void {
  //   // close all opened dialogs

  //   // remove items from session storage
  //   localStorage.clear();

  //   // show login screen
  //   this.router.navigate(["login"]);
  // }

  // public loginUser(loginData: any): Observable<any> {
  //   return this.http.post(this.apiService.get("login"), loginData);
  // }
  public updateProfile(data: any){
    return this.http.post(this.apiService.get("updateProfile"), data);
  }

  public getProfile(email: string){
    const url = this.apiService.get("getProfile") + email;
    return this.http.get(url);
  }

  public createProfile(data: any){
    return this.http.post(this.apiService.get("createProfile"), data);
  }
}