import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardDTO } from '../../Models/dashboard-dto';
import { RouterLink } from '@angular/router';

interface DashboardStats {
  users: number;
  orders: number;
  products: number;
  stocks: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  lowStockItems: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: DashboardDTO | null = null;
  private refreshSubscription!: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
    // تحديث كل 30 ثانية
    this.refreshSubscription = interval(30000).subscribe(() => {
      this.loadStats();
    });
  }

  loadStats() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}