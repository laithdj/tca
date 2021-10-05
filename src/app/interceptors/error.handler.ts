import { ErrorHandler } from "@angular/core";

export class CustomErrorHandler implements ErrorHandler {
  handleError(error) {
    console.error("CustomErrorHandler");
    console.error(error);
  }
}