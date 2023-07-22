import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated) {
      let newReq = request.clone({
        setHeaders: {
          Authorization: `${this.authService.token}`,
          AccessControlAllowOrigin : "*",
          AccessControlAllowMethods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
          AccessControlAllowHeaders : 'Origin, X-Requested-With, Content-Type, Accept',
        },
      });

      return next.handle(newReq);
    }
    return next.handle(request);
  }
}
