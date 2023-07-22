import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends BaseComponent{
  
  constructor(public authService: AuthService, private router: Router) {
    super();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
