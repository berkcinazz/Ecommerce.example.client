import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  requestCount: number = 0;
  constructor() {}

  startLoading() {
    this.requestCount++;
    this.toggleIsLoading();
  }
  stopLoading() {
    this.requestCount--;
    if (this.requestCount <= 0) this.requestCount = 0;
    this.toggleIsLoading();
  }
  toggleIsLoading() {
    this.isLoading.next(this.requestCount > 0);
  }
}
