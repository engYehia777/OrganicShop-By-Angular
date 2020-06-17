import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductModel } from 'src/app/models/ProductModel';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = new ProductModel();
  id;

  constructor(
    private category: CategoryService,
    private ProductService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.categories$ = category.getCategories();

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id) {
      this.ProductService.getById(this.id).pipe(take(1)).subscribe(p => {
      if (p) {
        this.product = p;
      }

    });
  }
  }

  ngOnInit(): void {
    
  }

  save(product) {
    if (this.id) {
      this.ProductService.Update(this.id, product);
    } else {
      this.ProductService.Create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('are you sure you want to delete this product?')) return; 

      this.ProductService.Delete(this.id);
      this.router.navigate(['/admin/products']);
    

  }

}
