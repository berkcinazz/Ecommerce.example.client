import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  cartOpen : boolean = false;

  constructor() { }
  changeCartOpen(){
    this.cartOpen = !this.cartOpen;
  }
}
