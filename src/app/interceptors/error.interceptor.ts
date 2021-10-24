import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, tap } from "rxjs/operators";
import { UserService } from '../services/user-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }
      ),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        if (error.error instanceof ErrorEvent) {
        } else {
          // If user is not authenticated redirect to login view
          if (error.status === 401 || error.status === 403) {
            // this.userService.logoutRedirect();
          }
        }
        // throw error
        return throwError(error);
      })
    );
  }
}