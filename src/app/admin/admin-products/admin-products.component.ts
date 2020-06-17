import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, Query, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscribtion: Subscription;
  //DT
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private ProductService: ProductService) {
    this.subscribtion = this.ProductService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();

    });
  }


  filter(query: string) {

    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }


}
