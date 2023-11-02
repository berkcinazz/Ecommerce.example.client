import { Component, NgIterable, OnInit } from '@angular/core';
import { BasketService } from '../core/services/basket.service';
import { GetBasketDto } from '../core/models/basket/getBasketDto';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  basketItems: GetBasketDto[];
  totalAmount: number = 0;
  constructor(private basketService: BasketService,
    private orderService:OrderService) {}

  ngOnInit(): void {
    this.getBasketItems();
  }

  getBasketItems() {
    this.basketService.getBaskets().subscribe((data) => {
      this.basketItems = data;
      console.log(data);
      console.log(this.basketItems);
      this.totalAmount = this.basketItems
        .map((o) => o.product.unitPrice * o.quantity)
        .reduce((a, c) => {
          return a + c;
        });
    });
  }

  deleteProductFromBasket(id: number) {
    this.basketService.delete(id).subscribe((data) => {
      this.getBasketItems();
    });
  }

  decreaseQuantity(item: GetBasketDto) {
    if (item.quantity > 1) {
      item.quantity--;
      this.basketService.update(item).subscribe((data) => {});
    } else {
      this.deleteProductFromBasket(item.id);
    }
  }

  increaseQuantity(item: GetBasketDto) {
    item.quantity++;
    this.basketService.update(item).subscribe((data) => {});
  }

  addOrder() {
    this.orderService.addOrder().subscribe((data) => {
      console.log(data);
    });
  }
}
