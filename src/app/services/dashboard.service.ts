import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DashboardDTO } from './../Models/dashboard-dto';

export interface DashboardStats {
  users: number;
  orders: number;
  products: number;
  stocks: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDashboardStats() {
    return this.http.get<DashboardDTO>(`${environment.baseUrl}/Dashboard/stats`, { withCredentials: true });
  }
}