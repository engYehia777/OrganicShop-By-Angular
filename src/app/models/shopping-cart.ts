import { Product } from 'src/app/models/product';
import { ShoppinCartItem } from './shopping-cart-items';


export class ShoppinCart {
items: ShoppinCartItem[] = []

    constructor(public itemsMap: { [productId: string]: ShoppinCartItem }) { 
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppinCartItem(item.product, item.quantity));
        }
       
    }

    getquantity(product: Product) {
        if(this.itemsMap){
        let item= this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }
      }

    get productIds(){
        return Object.keys(this.items);
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    get totalPrice(){
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    
}