import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/product';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ProductSignalRService } from '../../services/product-signal-r.service';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../Models/stock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

// 👇 RxJS Imports for Polling
import { interval, Subscription, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Product[] = []; // ✅ كل المنتجات من API — فيها availableStoreIds
  filteredProducts: Product[] = []; // ✅ بعد تطبيق الفلتر حسب المخزن
  stores: { id: number, name: string }[] = [];
  selectedStoreId!: number;

  // ✅ Cleanup & Polling
  private destroy$ = new Subject<void>();
  private pollingSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private _router: Router,
    private productSignalr: ProductSignalRService,
    private _stockService: StockService
  ) {}

  ngOnInit(): void {
    this.loadStores();
    this.loadProducts();

    // 👇 SignalR: New Product
    this.productSignalr.newProduct$.subscribe(newProduct => {
      console.log("SignalR: New product received");
      // ✅ لو السيرفر بيرجع المنتج الجديد مع availableStoreIds — نضيفه مباشرة
      // لو مش كده — نعمل refresh
      this.loadProducts();
    });

    // 👇 SignalR: Updated Product
    this.productSignalr.updatedProduct$.subscribe(updatedProduct => {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
      this.applyFilter();
    });

    // 👇 SignalR: Deleted Product
    this.productSignalr.deletedProductId$.subscribe(deletedId => {
      this.products = this.products.filter(p => p.id !== deletedId);
      this.applyFilter();
    });

    // 👇 START POLLING every 30 seconds — Fallback Sync
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  // 🔄 Polling every 500  to sync data
  private startPolling(): void {
    this.pollingSubscription = interval(500) // ✅ غيرناها لـ 500  عشان الأداء
      .pipe(
        switchMap(() => this.productService.getAllProducts().pipe(
          catchError(err => {
            console.warn('Polling failed, will retry next cycle', err);
            return [];
          })
        )),
        takeUntil(this.destroy$)
      )
      .subscribe(products => {
        const currentJson = JSON.stringify(this.products);
        const newJson = JSON.stringify(products);
        if (currentJson !== newJson) {
          console.log('Polling: Data refreshed from server');
          this.products = products;
          this.applyFilter();
        }
      });
  }

  // 📦 Load Stores
  loadStores() {
    this._stockService.getAllStocks().subscribe({
      next: (stores) => {
        this.stores = stores;
        if (this.stores && this.stores.length > 0) {
          this.selectedStoreId = this.stores[0].id;
          this.applyFilter();
        } else {
          this.filteredProducts = [];
        }
      },
      error: (err) => {
        console.error('Failed to load stores', err);
      }
    });
  }

  // 🔄 Apply Store Filter — باستخدام availableStoreIds
  applyFilter(): void {
    if (!this.selectedStoreId) {
      this.filteredProducts = this.products.map(p => ({
        ...p,
        isInStock: false
      }));
      return;
    }

    this.filteredProducts = this.products.map(p => ({
      ...p,
      isInStock: Array.isArray(p.availableStoreIds) && p.availableStoreIds.includes(this.selectedStoreId)
    }));
  }

  // 🔄 Reload Products — مش محتاج product-store mapping دلوقتي
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.applyFilter(); // ✅ طبق الفلتر فوراً بعد التحميل
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  // 🛒 Add to Cart — مع تحقق من isInStock
  addToCart(productId: number) {
    const product = this.filteredProducts.find(p => p.id === productId);

    if (!product?.isInStock) {
      Swal.fire({
        icon: 'warning',
        title: 'غير متوفر',
        text: `المنتج "${product?.name}" غير متوفر في المخزن المحدد.`,
        confirmButtonText: 'فهمت'
      });
      return;
    }

    this.cartService.addToCart({
      productId: productId,
      quantity: 1,
      storeId: this.selectedStoreId
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          Swal.fire({
            title: "تم الإضافة!",
            text: res.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            toast: true,
            position: 'top-end'
          });
        }
      },
      error: (err) => {
        console.error('Error adding product to cart', err);

        let errorMessage = 'فشل إضافة المنتج إلى العربة.';
        if (err?.error?.message) {
          errorMessage = err.error.message;
        }

        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: errorMessage,
          confirmButtonText: 'فهمت'
        });

        if (err.status === 405) {
          this._router.navigate(['/login']);
        }
      }
    });
  }

  // 🎯 Store Change Handler
  onStoreChange() {
    this.applyFilter();
  }

  // 🧭 Track By for Performance
  trackByProductId(index: number, item: Product): number {
    return item.id;
  }
}