import { Product } from "../product/product";

export interface GetBasketDto {
    id:number;
    userId:number;
    productId:number;
    quantity:number;
    amount:number;
    product:Product;
}