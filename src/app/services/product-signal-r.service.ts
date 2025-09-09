// services/product-signalr.service.ts
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../Models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductSignalRService {
  private hubConnection!: HubConnection;
  public newProduct$ = new Subject<Product>();
  public updatedProduct$ = new Subject<Product>();
  public deletedProductId$ = new Subject<number>();

  constructor() {
    this.createConnection();
    this.registerListeners();
    this.startConnection();
  }



  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.hupURL}/productHub`,{withCredentials:true}) // غير حسب URL مشروعك
      .build();
  }

  private registerListeners() {
    this.hubConnection.on('ReceiveNewProduct', (product: Product) => {
      this.newProduct$.next(product);
    });
       // 👇 الحدث الجديد للتعديل
  this.hubConnection.on('ReceiveUpdatedProduct', (product: Product) => {
    this.updatedProduct$.next(product);
  });
      // 👇 حدث اختبار جديد

      // 👇 الحدث الجديد للحذف
  this.hubConnection.on('ReceiveDeletedProduct', (data: { id: number }) => {
    this.deletedProductId$.next(data.id);
  });
 
  }

  private startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected!'))
      .catch(err => console.error('SignalR Connection Error: ', err));
  }
}