import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const URLS: any = {
  // authentication
  login: { path: "api/Login" },
  logout: { path: "api/Logout" },
  forgotPassword: { path: "ForgotPassword" },
  resetPassword: { path: "Account/ResetPassword" },
  changePassword: { path: "Account/ChangePassword" },
  updatePassword: { path: "Account/UpdatePassword" },

  getJobs: { path: "/public/job/list" },
  submitApplication: { path: "user/student-application" },
  applyJob: { path: "/public/job/list" },
};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl: string = "";

  constructor() {
    this.apiUrl = environment.api_url;
  }

  public get(name: string): string {
    return `${this.apiUrl}${URLS[name].path}`;
  }
}