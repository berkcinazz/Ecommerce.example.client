import { OrderItem } from "./orderItem";

export interface Order{
    id:number;
    totalAmount:number;
    userId:number;
    items:OrderItem[];
}