import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { getColor, getStoreId } from '../../../Store/Category_info/store.selector';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-cust-sub-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cust-sub-categories.component.html',
  styleUrl: './cust-sub-categories.component.css'
})
export class CustSubCategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselTrack1') carouselTrack1!: ElementRef;

  subCategories: Category[] = [];
  visibleItems = 8;
  isAnimating = false;
  currentIndex1 = 0;

  storeId$: Observable<number | null>;
  color$: Observable<string | null>;

  private destroy$ = new Subject<void>();

  // 🟢 لمسة أو سحب
  private touchStartX = 0;
  private touchEndX = 0;

  private isDragging = false;
  private startX = 0;
  private endX = 0;

  constructor(
    private categoryService: CategoryService,
    private store: Store
  ) {
    this.storeId$ = this.store.select(getStoreId);
    this.color$ = this.store.select(getColor);
  }

  ngOnInit() {
    this.loadCategories(2);
    this.storeId$
      .pipe(
        tap((parentId) => {
          if (parentId !== null) {
            this.loadCategories(parentId);
            console.log("ParentId : " + parentId);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.updateVisibleItems();
  }

  ngAfterViewInit() {
    const track = this.carouselTrack1?.nativeElement;
    if (track) {
      // ✅ أحداث اللمس
      track.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
      track.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });

      // ✅ أحداث السحب بالماوس
      track.addEventListener('mousedown', this.onMouseDown.bind(this));
      window.addEventListener('mouseup', this.onMouseUp.bind(this));
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCategories(parentId: number): void {
    this.categoryService.getCategories(parentId).subscribe({
      next: (res) => {
        this.subCategories = res.data || [];
        this.updateVisibleItems();
        this.updateCarousel(1);
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.subCategories = [];
      }
    });
  }

  @HostListener('window:resize')
  updateVisibleItems() {
    const width = window.innerWidth;
    if (width <= 576) this.visibleItems = 1;
    else if (width <= 768) this.visibleItems = 3;
    else if (width <= 992) this.visibleItems = 5;
    else if (width <= 1200) this.visibleItems = 7;
    else this.visibleItems = 8;

    const maxIndex = this.subCategories.length - this.visibleItems;
    if (this.currentIndex1 > maxIndex) {
      this.currentIndex1 = Math.max(0, maxIndex);
    }

    const el = document.querySelector('.center-items') as HTMLElement;
    if (this.subCategories.length <= 8) {
      if (el) el.style.justifyContent = 'center';
    } else {
      if (el) el.style.justifyContent = '';
    }

    this.updateCarousel(1);
  }

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

    const maxIndex = this.subCategories.length - this.visibleItems;
    if (row === 1) {
      this.currentIndex1 = this.currentIndex1 < maxIndex ? this.currentIndex1 + 1.16 : 0;
      this.animate(1);
    }
  }

  prev(row: number) {
    if (this.isAnimating) return;

    const maxIndex = this.subCategories.length - this.visibleItems;
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

  // ✅ Events: Touch
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  // ✅ Events: Mouse drag
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

  onSubSelected(id: number) {
    // اختر صنف فرعي
  }
}
