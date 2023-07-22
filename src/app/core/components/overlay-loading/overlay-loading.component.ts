import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-overlay-loading',
  templateUrl: './overlay-loading.component.html',
  styleUrls: ['./overlay-loading.component.scss'],
})
export class OverlayLoadingComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscribeToLoadingStatus();
  }
  subscribeToLoadingStatus() {
    this.loadingService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
