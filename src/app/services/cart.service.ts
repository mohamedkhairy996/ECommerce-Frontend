import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { cart } from '../Models/cart';
import { Observable } from 'rxjs';
import { CheckOutDTO } from '../Models/check-out-dto';
import { OrderDetailsDto } from '../Models/order-details-dto';
import { CartItem } from '../Models/cart-item';
import { CartResponse } from '../Models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient:HttpClient) { }
  
 addToCart(cart: cart) {
  console.log(`cart with productId=${cart.productId}, quantity=${cart.quantity} added to cart.`);

  // جسم الطلب اللي هيتبعت للـ API
  const body = {
    quantity: cart.quantity ,
    storeId:cart.storeId
  };

  return this._httpClient.post(
    `${environment.baseUrl}/cart/item/${cart.productId}`,
    body,
    { withCredentials: true }
  );
}
  getCart() {
    return this._httpClient.get<CartResponse>(`${environment.baseUrl}/cart`, { withCredentials: true });
  }

  removeFromCart(cartItemId: number){
    return this._httpClient.delete(`${environment.baseUrl}/Cart/item/${cartItemId}`, { withCredentials: true });
  }

  increaseItemCount(cartItemId: number) {
    return this._httpClient.put(`${environment.baseUrl}/Cart/item/${cartItemId}/increase`, cartItemId, { withCredentials: true });
  }
  decreaseItemCount(cartItemId: number){
    return this._httpClient.put(`${environment.baseUrl}/cart/item/${cartItemId}/decrease`, cartItemId, { withCredentials: true });
  }

  checkOut(checkout : CheckOutDTO)
  {
    return this._httpClient.post<CheckOutDTO>(`${environment.baseUrl}/Cart/checkout`,checkout, { withCredentials: true });
  }

  getOrderDetails()
  {
    return this._httpClient.get<OrderDetailsDto>(`${environment.baseUrl}/Order/user`, { withCredentials: true });
  }
  
  
}