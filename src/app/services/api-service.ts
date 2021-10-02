import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const URLS: any = {
  // authentication
  login: { path: "api/Login" },
  logout: { path: "api/Logout" },
  forgotPassword: { path: "api/ForgotPassword" },
  resetPassword: { path: "api/Account/ResetPassword" },
  changePassword: { path: "api/Account/ChangePassword" },
  updatePassword: { path: "api/Account/UpdatePassword" },

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