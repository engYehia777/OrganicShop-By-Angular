import { ShoppinCart } from './models/shopping-cart';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppinCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map(x => new ShoppinCart(
      (x as any).items
    )));
  }

  async addToCart(product) {
    this.updateToCart(product, 1);
  }

  async removeFromCart(product) {
    this.updateToCart(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }




  async updateToCart(product, quntityState: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) {
        let q = item.payload.val().quantity + quntityState;
        if (q === 0) { item$.remove(); }
        else {
          item$.update({ quantity: item.payload.val().quantity + quntityState })
        }
      } else {
        item$.set({ product: product, quantity: 1 });

      }
    });

  }

}
