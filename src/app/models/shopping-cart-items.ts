import { Product } from 'src/app/models/product';

export class ShoppinCartItem {


    constructor(public product: Product, public quantity: number) {

    }


    get totalPrice() {
        return this.product.price * this.quantity;
    }
}
