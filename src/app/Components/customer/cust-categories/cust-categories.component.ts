// import { CommonModule } from '@angular/common';
// import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

// @Component({
//   selector: 'app-cust-categories',
//   imports:[CommonModule],
//   templateUrl: './cust-categories.component.html',
//   styleUrls: ['./cust-categories.component.css']
// })
// export class CustCategoriesComponent implements AfterViewInit {

//   @ViewChild('categoryCarousel', { static: false }) carousel!: ElementRef;
//   colors = [
//     '#f8d7da', '#d1ecf1', '#d4edda', '#fff3cd',
//     '#cce5ff', '#e2e3e5', '#f5c6cb', '#bee5eb',
//     '#c3e6cb', '#ffeeba', '#b8daff'
//   ];

//   categories = [
//     { name: 'Cake & Milk', image: 'assets/imgs/shop/cat-13.png', items: 26 },
//     { name: 'Organic Kiwi', image: 'assets/imgs/shop/cat-12.png', items: 28 },
//     { name: 'Peach', image: 'assets/imgs/shop/cat-11.png', items: 14 },
//     { name: 'Red Apple', image: 'assets/imgs/shop/cat-9.png', items: 54 },
//     { name: 'Snack', image: 'assets/imgs/shop/cat-3.png', items: 56 },
//     { name: 'Vegetables', image: 'assets/imgs/shop/cat-1.png', items: 72 },
//     { name: 'Strawberry', image: 'assets/imgs/shop/cat-2.png', items: 36 },
//     { name: 'Black Plum', image: 'assets/imgs/shop/cat-4.png', items: 123 },
//     { name: 'Custard Apple', image: 'assets/imgs/shop/cat-5.png', items: 34 },
//     { name: 'Coffee & Tea', image: 'assets/imgs/shop/cat-14.png', items: 89 },
//     { name: 'Headphone', image: 'assets/imgs/shop/cat-15.png', items: 87 }
//   ];

//   currentIndex = 0;
//   visibleItems = 8;
//   isAnimating = false;

//   ngAfterViewInit() {
//     this.updateVisibleItems();
//     this.updateCarousel();
//   }

//   // تغيير عدد العناصر حسب عرض الشاشة
//   @HostListener('window:resize')
//   updateVisibleItems() {
//     const width = window.innerWidth;
//     if (width <= 576) this.visibleItems = 1;
//     else if (width <= 768) this.visibleItems = 3;
//     else if (width <= 992) this.visibleItems = 5;
//     else if (width <= 1200) this.visibleItems = 7;
//     else this.visibleItems = 8;

//     if (this.currentIndex > this.categories.length - this.visibleItems) {
//       this.currentIndex = Math.max(0, this.categories.length - this.visibleItems);
//     }
//     this.updateCarousel();
//   }

//   // تحديث موقع السلايدر
//   private updateCarousel() {
//     const itemWidth = 100 / this.visibleItems;
//     const offset = -this.currentIndex * itemWidth;
//     const el = this.carousel.nativeElement as HTMLElement;
//     el.style.transform = `translateX(${offset}%)`;
//     el.style.transition = 'transform 0.5s ease';
//   }

//   next() {
//   if (this.isAnimating) return;
//   if (this.currentIndex < this.categories.length - this.visibleItems) {
//     this.currentIndex++;
//   } else {
//     this.currentIndex = 0; // رجوع لأول عنصر
//   }
//   this.animate();
// }

// prev() {
//   if (this.isAnimating) return;
//   if (this.currentIndex > 0) {
//     this.currentIndex--;
//   } else {
//     this.currentIndex = this.categories.length - this.visibleItems; // آخر مجموعة عناصر
//   }
//   this.animate();
// }


//   private animate() {
//     this.isAnimating = true;
//     this.updateCarousel();
//     setTimeout(() => { this.isAnimating = false; }, 500);
//   }
// }


import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cust-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cust-categories.component.html',
  styleUrls: ['./cust-categories.component.css']
})
export class CustCategoriesComponent {
  @ViewChild('carouselTrack', { static: false }) track!: ElementRef;

  categories = [
    { name: 'Cake & Milk', image: 'assets/imgs/shop/cat-13.png', items: 26 },
    { name: 'Organic Kiwi', image: 'assets/imgs/shop/cat-12.png', items: 28 },
    { name: 'Peach', image: 'assets/imgs/shop/cat-11.png', items: 14 },
    { name: 'Red Apple', image: 'assets/imgs/shop/cat-9.png', items: 54 },
    { name: 'Snack', image: 'assets/imgs/shop/cat-3.png', items: 56 },
    { name: 'Vegetables', image: 'assets/imgs/shop/cat-1.png', items: 72 },
    { name: 'Strawberry', image: 'assets/imgs/shop/cat-2.png', items: 36 },
    { name: 'Black Plum', image: 'assets/imgs/shop/cat-4.png', items: 123 },
    { name: 'Custard Apple', image: 'assets/imgs/shop/cat-5.png', items: 34 },
    { name: 'Coffee & Tea', image: 'assets/imgs/shop/cat-14.png', items: 89 },
    { name: 'Headphone', image: 'assets/imgs/shop/cat-15.png', items: 87 }
  ];

  currentIndex = 0;
  visibleItems = 8;

  next() {
    if (this.currentIndex < this.categories.length - this.visibleItems) {
      this.currentIndex++;
      this.updateTransform();
    }else if (this.currentIndex == this.categories.length - this.visibleItems)
    {
      this.currentIndex = 0;
      this.updateTransform();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }else if (this.currentIndex == 0)
    {
      this.currentIndex = this.categories.length - this.visibleItems;
      this.updateTransform();
    }
  }

  private updateTransform() {
    const offset = -(100 / this.visibleItems) * this.currentIndex;
    this.track.nativeElement.style.transform = `translateX(${offset}%)`;
  }
}
