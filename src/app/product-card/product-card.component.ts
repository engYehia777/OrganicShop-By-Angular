import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppinCart } from '../models/shopping-cart';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

@Input('product') product: Product

@Input('show-actions') showActions = true;

@Input('shopping-cart') shoppingCart: ShoppinCart;

check;

  constructor(private cartService: ShoppingCartService) { 

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  

}
