import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { environment } from '../../environments/environment.development';
import { ProductDTO } from '../Models/productDTO';
import { ProductStoreDTO } from '../Models/product-store-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient : HttpClient) 
  {

  }
  getAllProducts()
  {
    return this._httpClient.get<Product[]>(`${environment.baseUrl}/product`);
  }
  getAllProductsWithStores()
  {
    return this._httpClient.get<ProductStoreDTO[]>(`${environment.baseUrl}/Product/productStores`);
  }
  addProduct(product:FormData)
  {
    return this._httpClient.post(`${environment.baseUrl}/product`,product);
  }
  deleteProduct(id:number)
  {
    return this._httpClient.delete(`${environment.baseUrl}/product/`+id);
  }
  getProductById(id:number)
  {
    return this._httpClient.get<Product>(`${environment.baseUrl}/product/`+id);
  }
  getProductByIdWithStores(id:number)
  {
    return this._httpClient.get<Product>(`${environment.baseUrl}/product/${id}/productstores`);
  }
  updateProduct(id:number,product:FormData)
  {
    return this._httpClient.put(`${environment.baseUrl}/product/`+id,product);
  }

}
