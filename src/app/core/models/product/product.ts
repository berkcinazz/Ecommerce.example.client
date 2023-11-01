import { Brand } from "../brand/brand";

export interface Product {
    id: number;
    name: string;
    description: string;
    productCode: string;
    unitPrice: number;
    UnitsInStock: number;
    QuantityPerUnit: string;
    CommonCode: string; 
    OnSale: boolean;
    ShippingCost: number;
    BrandId: number;
    brand: Brand;
}
    