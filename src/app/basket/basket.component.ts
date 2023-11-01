import { Component, NgIterable, OnInit } from '@angular/core';
import { BasketService } from '../core/services/basket.service';
import { GetBasketDto } from '../core/models/basket/getBasketDto';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  basketItems: GetBasketDto[];
  totalAmount: number = 0;
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.getBasketItems();
  }

  getBasketItems() {
    this.basketService.getBaskets().subscribe((data) => {
      this.basketItems = data;
      console.log(data);
      console.log(this.basketItems);
      this.totalAmount = this.basketItems.map(o => o.product.unitPrice).reduce((a, c) => { return a + c });
    });
  }

  deleteProductFromBasket(id: number) {
    this.basketService.delete(id).subscribe((data) => {
      this.getBasketItems();
    });
  }
}
