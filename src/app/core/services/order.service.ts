import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = environment.apiUrl + '/Orders';
  constructor(private httpClient: HttpClient) { }


  getOrders() :Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.apiUrl + '/GetOrders');
  }
}
