import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageRequest } from '../models/pageRequest';
import { Observable } from 'rxjs';
import { GetBasketDto } from '../models/basket/getBasketDto';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  apiUrl: string = environment.apiUrl + '/Baskets';
  constructor(private httpClient: HttpClient) { }

  getBaskets(): Observable<GetBasketDto[]> {
    var url = this.apiUrl + `/GetList`;
    return this.httpClient.get<GetBasketDto[]>(url);   
  }

  delete(id:number): Observable<GetBasketDto> {
    var url = this.apiUrl + `/${id}`;
    return this.httpClient.delete<GetBasketDto>(url);
  }

}
