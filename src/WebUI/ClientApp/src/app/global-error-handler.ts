import { HttpErrorResponse } from '@angular/common/http';
import {ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  /**
   *
   */
  constructor(private injector: Injector) { }
  handleError(error: Error | HttpErrorResponse): void {
    const toastrService = this.injector.get(ToastrService);
    var message;

     if (error instanceof Error) {
        message = error.message;
     }
     else {
       message = (error as HttpErrorResponse).message;
     }

     toastrService.error(message);
     console.log(error);
  }

}

