import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/order';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { OrderAPIResponse } from '../Models/order-apiresponse';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/orders'; // غير الرابط حسب API عندك

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<OrderAPIResponse>(`${environment.baseUrl}/Order`).pipe(
      map(response => {
        if (response.success) {
          console.log(response.data);
          return response.data.map(order => ({
            ...order,
            status: order.orderStatus, // نحول orderStatus لـ status عشان يتوافق مع الكود
            city: order.city // لو ما عندكش إيميل، تقدر تخليه فاضي أو تخليه undefined
          }));
        }
        throw new Error('Failed to load orders');
      })
    );
  }

  getOrderById(id: number) {
  return this.http.get<Order>(`${environment.baseUrl}/Order/${id}`);
}

updateOrderStatus(orderId: number, status: string): Observable<void> {
  return this.http.patch<void>(`${environment.baseUrl}/Order/${orderId}/status`, { status });
}
}
