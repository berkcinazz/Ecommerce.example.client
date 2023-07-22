import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage = '';
        let errorMessageTitle = '';
        console.log(errorResponse.error);
        console.log(errorResponse.error.title);
        if (errorResponse.error instanceof ErrorEvent) {
          errorMessage = `Client Side Error: ${errorResponse.error.message}`;
        } else {
          if (errorResponse.error?.type)
          {
            switch (errorResponse.error.type) {
              case 'https://example.com/probs/business':
                errorMessage = errorResponse.error.detail;
                errorMessageTitle = errorResponse.error.title;
                break;
  
              case 'https://example.com/probs/validation':
                errorMessage = ProcessValidationException(errorResponse.error.detail);
                break;
  
              case 'https://example.com/probs/authorization':
                errorMessage = 'Unauthorized';
                break;
              default:
                errorMessage = 'Something went wrong, please contact the system administrator';
                break;
            }
          }
          else{
            errorMessage = 'Something went wrong, please contact the system administrator';
          }
        }
        this.toastr.error(errorMessage, errorMessageTitle);
        return throwError(errorMessage);
      })
    );
  }
}

function ProcessValidationException(error: any): string {
  let message = '';
  error.Errors.forEach((err: any) => {
    message += err.ErrorMessage + '\n';
  });
  return message;
}
