import { HttpEvent, HttpHandler,HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService, 
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get token from service
    const token = this.userService.getAuthToken();
    this.spinner.show();
    request = request.clone({
      // Add required headers to API calls
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    //send modified request
    return next.handle(request);
  }
}