import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { catchError, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductDataDto } from '../../../models/product-data-dto';
import { ProductService } from '../../../services/product.service';
import { ProductResponseDto } from '../../../models/product-response-dto';

@Component({
  selector: 'app-cust-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cust-featured-products.component.html',
  styleUrls: ['./cust-featured-products.component.css']
})
export class CustFeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: ProductDataDto[] = [];
  totalPages: number = 1;
  isLoading: boolean = false;
  error: string | null = null;
   visibleItems = 8;
  isAnimating = false;
  currentIndex1 = 0;
 // 🟢 دعم السحب باللمس/الماوس
  private touchStartX = 0;
  private touchEndX = 0;

  private isDragging = false;
  private startX = 0;
  private endX = 0;
  private destroy$ = new Subject<void>();
  photo:string="assets/uploads/images/products/noimage-0p.png";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getFeaturedProducts(0)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Error loading featured products:', error);
          this.error = 'Failed to load featured products.';
          this.isLoading = false;
          return of();
        })
      )
      .subscribe(result => {
        this.featuredProducts = result.data || [];
        this.totalPages = result.meta?.lastPage || 1;
        this.isLoading = false;
        console.log(result.data[0].photos);
      });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFeaturedProducts();
    }
  }

  getPagesArray(): number[] {
    if (this.totalPages <= 0) return [];
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

handleImgError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = this.photo; // صورة افتراضية
}

  
  @HostListener('window:resize')
  updateVisibleItems() {
    const width = window.innerWidth;
    if (width <= 576) this.visibleItems = 1;
    else if (width <= 768) this.visibleItems = 2;
    else if (width <= 992) this.visibleItems = 3;
    else if (width <= 1200) this.visibleItems = 5;
    else this.visibleItems = 8;

    const maxIndex = this.featuredProducts.length - this.visibleItems;
    if (this.currentIndex1 > maxIndex) {
      this.currentIndex1 = Math.max(0, maxIndex);
    }

    this.updateCarousel(1);
  }

  @ViewChild('carouselTrack1') carouselTrack1!: ElementRef;

  updateCarousel(row: number) {
    const track = row === 1 ? this.carouselTrack1?.nativeElement : null;
    if (!track) return;

    const itemWidth = 100 / this.visibleItems;
    const offset = -this.currentIndex1 * itemWidth;
    track.style.transform = `translateX(${offset}%)`;
    track.style.transition = 'transform 0.5s ease';
  }

  next(row: number) {
    if (this.isAnimating) return;

    const maxIndex = this.featuredProducts.length - this.visibleItems;

    if (row === 1) {
      this.currentIndex1 = this.currentIndex1 < maxIndex ? this.currentIndex1 + 1.16 : 0;
      this.animate(1);
    }
  }

  prev(row: number) {
    if (this.isAnimating) return;

    const maxIndex = this.featuredProducts.length - this.visibleItems;

    if (row === 1) {
      this.currentIndex1 = this.currentIndex1 > 0 ? this.currentIndex1 - 1 : maxIndex + 0.16;
      this.animate(1);
    }
  }

  private animate(row: number) {
    this.isAnimating = true;
    this.updateCarousel(row);
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  // ✅ أحداث السحب باللمس
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        this.prev(1);
      } else {
        this.next(1);
      }
    }
  }

  // ✅ أحداث السحب بالماوس
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.endX = event.clientX;
  }

  onMouseUp() {
    if (!this.isDragging) return;

    const swipeDistance = this.endX - this.startX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        this.prev(1);
      } else {
        this.next(1);
      }
    }

    this.isDragging = false;
    this.startX = 0;
    this.endX = 0;
  }
}
