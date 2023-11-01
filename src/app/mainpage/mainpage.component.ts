import { Component, OnInit } from '@angular/core';
import { ObservableService } from '../core/services/observable.service';
import { ProductService } from '../core/services/product.service';
import { PageRequest } from '../core/models/pageRequest';
import { GenericPageableModel } from '../core/models/genericPageableModel';
import { Product } from '../core/models/product/product';
import { BasketService } from '../core/services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  products: GenericPageableModel<Product>;
  pageRequest: PageRequest = {
    pageIndex: 0,
    pageSize: 16,
  };
  constructor(
    private observableService: ObservableService,
    private productService: ProductService,
    private basketService: BasketService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts(this.pageRequest).subscribe((data) => {
      this.observableService.setProducts(data);
      this.observableService.products$.subscribe((responseData) => {
        console.log(responseData);
        this.products = responseData;
      });
    });
  }

  addToBasket(productId: number) {
    this.basketService.add(productId).subscribe((data) => {
      this.router.navigateByUrl('/basket');
    });
  }
}
