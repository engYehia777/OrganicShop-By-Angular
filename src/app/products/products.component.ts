import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filterdProducts: Product[];
  category: string;
  cart : any;
  subscription : Subscription;

  constructor(private productService: ProductService, activatedRoute: ActivatedRoute,private shoppingCartService :ShoppingCartService) {
    
    
    this.productService.getAll().subscribe(p => {
      this.products = this.filterdProducts = p;

      activatedRoute.queryParamMap.subscribe(params => {
        this.category = params.get('category'); 

        this.filterdProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;

      });
    });
    

  }

  async ngOnInit() {
    this.subscription=(await this.shoppingCartService.getCart()).subscribe(cart => {this.cart= cart;});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
