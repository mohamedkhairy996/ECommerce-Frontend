import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../Models/order';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ]
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  orderId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order : Order) => {
        this.order = order;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load order details'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/orders']);
  }

 updateStatus(newStatus: string) {
  if (!this.order) return;

  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to mark this order as ${newStatus}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, confirm',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.updateOrderStatus(this.order!.id, newStatus).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Order status updated to ${newStatus}`,
            showConfirmButton: false,
            timer: 2000
          });
          location.href="/admin/orderDetails/"+this.orderId;
          // تحديث الحالة في الـ UI
          this.order!.orderStatus = newStatus;
        },
        error: (err: any) => {
          console.error('Failed to update order status', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update status',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
  });
}
  printOrder() {
    window.print();
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    switch (status) {
      case 'Pending': return 'badge bg-warning';
      case 'Processing': return 'badge bg-info';
      case 'Approved': return 'badge bg-success';
      case 'Shipped': return 'badge bg-secondary';
      case 'Cancelled': return 'badge bg-danger';
      default: return 'badge bg-light text-dark';
    }
  }
}