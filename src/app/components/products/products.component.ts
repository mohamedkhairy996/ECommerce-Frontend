import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../Models/stock';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { forkJoin } from 'rxjs';
import { Product } from '../../Models/product';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { ProductSignalRService } from '../../services/product-signal-r.service';
import Swal from 'sweetalert2';

// 👇 RxJS Imports for Polling
import { interval, Subscription, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  stocks: Stock[] = [];
  products: Product[] = [];

  // ✅ Cleanup Subjects
  private destroy$ = new Subject<void>();

  // ✅ Polling Subscriptions
  private productPollingSubscription!: Subscription;
  private stockPollingSubscription!: Subscription;

  constructor(
    private stockService: StockService,
    private productService: ProductService,
    private productSignalr: ProductSignalRService
  ) {}

  ngOnInit(): void {
    this.loadStocks(); // Initial load (products + stocks)

    // 👇 SignalR: Listen for new products
    this.productSignalr.newProduct$.subscribe(newProduct => {
      console.log('SignalR: New product received');
      this.products.unshift(newProduct); // Add to top
    });

    // 👇 START POLLING for PRODUCTS every 1 seconds
    this.startProductPolling();

    // 👇 START POLLING for STOCKS every 1 seconds
    this.startStockPolling();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.productPollingSubscription) {
      this.productPollingSubscription.unsubscribe();
    }
    if (this.stockPollingSubscription) {
      this.stockPollingSubscription.unsubscribe();
    }
  }

  // 🔄 Polling for PRODUCTS
  private startProductPolling(): void {
    this.productPollingSubscription = interval(1000)
      .pipe(
        switchMap(() => this.productService.getAllProducts().pipe(
          catchError(err => {
            console.warn('Product polling failed', err);
            return [];
          })
        )),
        takeUntil(this.destroy$)
      )
      .subscribe(products => {
        const currentJson = JSON.stringify(this.products);
        const newJson = JSON.stringify(products);
        if (currentJson !== newJson) {
          console.log('Polling: Products refreshed');
          this.products = products;
        }
      });
  }

  // 🔄 Polling for STOCKS
  private startStockPolling(): void {
    this.stockPollingSubscription = interval(1000)
      .pipe(
        switchMap(() => this.stockService.getAllStocks().pipe(
          catchError(err => {
            console.warn('Stock polling failed', err);
            return [];
          })
        )),
        takeUntil(this.destroy$)
      )
      .subscribe(stocks => {
        const currentJson = JSON.stringify(this.stocks);
        const newJson = JSON.stringify(stocks);
        if (currentJson !== newJson) {
          console.log('Polling: Stocks refreshed');
          this.stocks = stocks;
        }
      });
  }

  // 📦 Initial Load — Products + Stocks Together
  loadStocks(): void {
    forkJoin({
      products: this.productService.getAllProducts(),
      allStores: this.stockService.getAllStocks()
    }).subscribe({
      next: ({ products, allStores }) => {
        this.stocks = allStores;
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading stocks or products', err);
        Swal.fire('خطأ', 'فشل تحميل البيانات', 'error');
      }
    });
  }

  // 🗑️ Delete Stock
  deleteStock(id: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockService.deleteStock(id).subscribe({
          next: () => {
            this.stocks = this.stocks.filter(s => s.id !== id);
            Swal.fire('تم الحذف!', 'تم حذف المخزون بنجاح.', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('خطأ!', 'حدث خطأ أثناء حذف المخزون.', 'error');
          }
        });
      }
    });
  }

  // 🗑️ Delete Product
  deleteProduct(id: number): void {
    const productToDelete = this.products.find(p => p.id === id);
    const productName = productToDelete?.name || 'هذا المنتج';

    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: `لن تتمكن من التراجع عن حذف "${productName}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== id);
            Swal.fire('تم الحذف!', `"${productName}" تم حذفه بنجاح.`, 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('خطأ!', 'حدث خطأ أثناء حذف المنتج. حاول مرة أخرى.', 'error');
          }
        });
      }
    });
  }

  // 🧭 Track By for Performance
  trackByProductId(index: number, item: Product): number {
    return item.id;
  }

  // 🧭 Optional: Track stocks too (if you use *ngFor on stocks)
  trackByStockId(index: number, item: Stock): number {
    return item.id;
  }
}