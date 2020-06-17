import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filterdProducts: Product[];
  category: string;

  constructor(private productService: ProductService, activatedRoute: ActivatedRoute) {
    
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
}
