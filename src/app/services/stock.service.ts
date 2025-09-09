import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../Models/stock';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StockService {

   constructor(private _httpClient : HttpClient) 
  {

  }
  getAllStocks()
  {
    return this._httpClient.get<Stock[]>(`${environment.baseUrl}/store`);
  }
  addStock(stock:any)
  {
    return this._httpClient.post(`${environment.baseUrl}/store`,stock);
  }
  deleteStock(id:number)
  {
    return this._httpClient.delete(`${environment.baseUrl}/store/`+id);
  }
  getStockById(id:number)
  {
    return this._httpClient.get(`${environment.baseUrl}/store/`+id);
  }

}
