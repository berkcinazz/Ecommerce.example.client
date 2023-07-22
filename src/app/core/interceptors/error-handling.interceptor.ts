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
        console.log(errorResponse);

        if (errorResponse.error instanceof ErrorEvent) {
          errorMessage = `Client Side Error: ${errorResponse.error.message}`;
        } else {
          if (errorResponse.error?.Type)
          {
            switch (errorResponse.error.Type) {
              case 'https://example.com/probs/business':
                errorMessage = ProcessBusinessException(errorResponse.error);
                break;
  
              case 'https://example.com/probs/validation':
                errorMessage = ProcessValidationException(errorResponse.error);
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
        this.toastr.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
function ProcessBusinessException(error: any): string {
  return error.Detail;
}

function ProcessValidationException(error: any): string {
  let message = '';
  error.Errors.forEach((err: any) => {
    message += err.ErrorMessage + '\n';
  });
  return message;
}
