import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../Models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  imports: [
  CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ]
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'city', 'phoneNumber', 'status', 'totalPrice', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);
  filteredDataSource = new MatTableDataSource<Order>([]);
  pageSize = 10;
  filterText = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.filteredDataSource.data = orders;
        // بعد جلب البيانات، ضعها في DataSource
        this.filteredDataSource.data = orders;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }

  
  createNewOrder() {
    location.href='/home';
  }

  viewOrder(id: number) {
   location.href=`/admin/orderDetails/${id}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'badge bg-warning';
      case 'Processing': return 'badge bg-info';
      case 'Approved': return 'badge bg-success';
      case 'Shipped': return 'badge bg-secondary';
      case 'Cancelled': return 'badge bg-danger';
      default: return 'badge bg-light';
    }
  }
}