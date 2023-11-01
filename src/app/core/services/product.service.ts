import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetProductsModel } from '../models/product/getProductsModel';
import { Observable } from 'rxjs';
import { PageRequest } from '../models/pageRequest';
import { Product } from '../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = environment.apiUrl + '/Products';
  constructor(private httpClient: HttpClient) { }

  getProducts(pageRequest:PageRequest): Observable<GetProductsModel> {
    var url = this.apiUrl + `?PageIndex=${pageRequest.pageIndex}&PageSize=${pageRequest.pageSize}`;
    return this.httpClient.get<GetProductsModel>(url);   
  }

  getProduct(id: number): Observable<Product> {
    var url = this.apiUrl + `/${id}`;
    return this.httpClient.get<Product>(url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<Product> {
    var url = this.apiUrl + `/${id}`;
    return this.httpClient.delete<Product>(url);
  }
  
}
