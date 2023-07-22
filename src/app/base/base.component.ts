import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AppInjector } from '../app.module';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {
  isAuthenticated: boolean = false;
  constructor() {
    const authService = AppInjector.get(AuthService);
    this.isAuthenticated = authService.isAuthenticated;
    authService.isAuthSubject.subscribe((response) => {
      this.isAuthenticated = response;
    });
  }
}
