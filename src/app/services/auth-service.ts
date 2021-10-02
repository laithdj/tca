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
export class AuthService {
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

  public getReCaptchaSettings(): Observable<any> {
    return this.http.get(
      this.apiService.get("getSystemConfigurationReCaptcha")
    );
  }

  public postReCaptchaSettings(data: any): Observable<any> {
    return this.http.post(
      this.apiService.get("postSystemConfigurationReCaptcha"),
      data
    );
  }

  public putReCaptchaSettings(data: any): Observable<any> {
    return this.http.put(
      this.apiService.get("updateSystemConfigurationReCaptcha"),
      data
    );
  }

  public getRolesByCabinetId(
    id: string,
    includeUsers: boolean = false
  ): Observable<any> {
    let url = this.apiService.get("getRolesByCabinetId");
    url = url.replace("{cabinetId}", id);

    const params = new HttpParams().set("includeUsers", String(includeUsers));
    return this.http.get(url, params);
  }

  public getRoleByIdWithPermissions(id: string): Observable<any> {
    let url = this.apiService.get("getRoleByIdWithPermissions");
    url = url.replace("{roleId}", id);
    return this.http.get(url);
  }

  public getRoleUsersById(id: string): Observable<any> {
    let url = this.apiService.get("getRoleUsersById");
    url = url.replace("{roleId}", id);
    return this.http.get(url);
  }

  public getAllPermissions(): Observable<any> {
    return this.http.get(`${this.apiService.get("getAllPermissions")}`);
  }

  public deleteRoleById(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiService.get("deleteRoleByRoleId")}/${id}`
    );
  }

  public createRole(data: any): Observable<any> {
    return this.http.post(`${this.apiService.get("createRole")}`, data);
  }

  public createRoleWithPermissions(data: any): Observable<any> {
    return this.http.post(
      `${this.apiService.get("createRoleWithPermissions")}`,
      data
    );
  }

  public editRole(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiService.get("editRole")}/${id}`, data);
  }

  public updateRoleWithPermissions(id: string, data: any): Observable<any> {
    let url = this.apiService.get("updateRoleWithPermissions");
    url = url.replace("{roleId}", id);
    return this.http.put(url, data);
  }

  public updateRoleUsers(id: string, data: any): Observable<any> {
    let url = this.apiService.get("updateRoleUsers");
    url = url.replace("{roleId}", id);
    return this.http.put(url, data);
  }

  public isAuthenticated(): boolean {
    // get token from browser session storage and return
    const token = localStorage.getItem("token");

    return token ? true : false;
  }

  public isSessionTimeout(): boolean {
    // get session timeout from browser session storage and return
    const timeout = sessionStorage.getItem("session-timeout");

    return timeout ? true : false;
  }

  public setSessionTimeout(): any {
    // set session timeout in browser session storage
    sessionStorage.setItem("session-timeout", 'true');
  }

  public removeSessionTimeout(): any {
    // remove session timeout from browser session storage
    sessionStorage.removeItem("session-timeout");
  }
}