import { Product } from './product';

export class ProductModel implements Product {
    constructor() {
        this.key;
        this.title='';
        this.price=0;
        this.category='';
        this.imageUrl='';
    }
    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    
    private _title : string;
    public get title() : string {
        return this._title;
    }
    public set title(v : string) {
        this._title = v;
    }

    
    private _price : number;
    public get price() : number {
        return this._price;
    }
    public set price(v : number) {
        this._price = v;
    }
    
    
    private _category : string;
    public get category() : string {
        return this._category;
    }
    public set category(v : string) {
        this._category = v;
    }
    
    
    private _imageUrl : string;
    public get imageUrl() : string {
        return this._imageUrl;
    }
    public set imageUrl(v : string) {
        this._imageUrl = v;
    }
    
}