import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce.example.client';

  constructor(
    private router: Router,
    private loadingService: LoadingService,
  ) {}
  ngOnInit(): void {
    this.subscribeToRouterEvents();
  }
  subscribeToRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.startLoading();
      }
      if (event instanceof NavigationEnd) {
        this.loadingService.stopLoading();
      }
    });
  }
}
