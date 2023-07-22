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
  skippedDomains: string[] = ['VideoViews'];

  constructor(private toastr: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let isSkipped = false;
    this.skippedDomains.forEach((uri) => {
      if (request.url.toLocaleLowerCase().includes(uri.toLocaleLowerCase())) {
        isSkipped = true;
      }
    });
    if (isSkipped) return next.handle(request);
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage = '';
        console.log(errorResponse);
        console.log(errorResponse.error.Type);

        if (errorResponse.error instanceof ErrorEvent) {
          errorMessage = `Client Side Error: ${errorResponse.error.message}`;
        } else {
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
              errorMessage =
                'Bilinmedik hata. Lütfen daha sonra tekrar deneyiniz.';
              break;
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
