import { Product } from "../product/product";

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    amount: number;
    product:Product;
}
