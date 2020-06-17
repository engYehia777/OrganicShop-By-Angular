import { ProductModel } from './models/ProductModel';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  Create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.key, ...a.payload.val() })))
      );
  }

  getById(productId) {
    return this.db.object<ProductModel>('/products/' + productId).valueChanges();
  }

  Update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  Delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
