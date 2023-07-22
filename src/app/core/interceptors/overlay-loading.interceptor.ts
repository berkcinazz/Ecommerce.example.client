import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class OverlayLoadingInterceptor implements HttpInterceptor {
  skippedDomains: string[] = ['VideoViews'];
  constructor(private loadingService: LoadingService) {}

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
    if (!isSkipped) this.loadingService.startLoading();
    return next
      .handle(request)
      .pipe(finalize(() => this.loadingService.stopLoading()));
  }
}
