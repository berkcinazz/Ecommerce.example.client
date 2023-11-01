import { Injectable } from '@angular/core';
import { GetProductsModel } from '../models/product/getProductsModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  public _products$ : BehaviorSubject<GetProductsModel> = new BehaviorSubject<GetProductsModel>(null!);
  constructor() { }


  public get products$() {
    return this._products$.asObservable();
  }

  public setProducts(products: GetProductsModel) {
    this._products$.next(products);
  }

}