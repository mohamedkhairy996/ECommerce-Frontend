import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-cust-sub-categories',
  imports: [CommonModule],
  templateUrl: './cust-sub-categories.component.html',
  styleUrl: './cust-sub-categories.component.css'
})
export class CustSubCategoriesComponent implements OnInit {
  
  @ViewChild('carouselTrack1') carouselTrack1!: ElementRef;
  @ViewChild('carouselTrack2') carouselTrack2!: ElementRef;

  constructor(private categoryService: CategoryService) {}
  visibleItems = 8;
  isAnimating = false;
  category_id_color!:[string,string]
  categories: Category[] = [];
  firstHalf: any[] = [];
  secondHalf: any[] = [];

ngOnInit() {
  
  this.categoryService.getCategories(1).subscribe(res => {
    this.categories = res.data;
    const half = Math.ceil(this.categories.length / 2);
    this.firstHalf = this.categories.slice(0, half);
    this.secondHalf = this.categories.slice(half);
    });
  }

currentIndex1 = 0;
currentIndex2 = 0;

updateCarousel(row: number) {
  const track = row === 1 ? this.carouselTrack1.nativeElement : this.carouselTrack2.nativeElement;
  const currentIndex = row === 1 ? this.currentIndex1 : this.currentIndex2;

  const itemWidth = 100 / this.visibleItems;
  const offset = -currentIndex * itemWidth;
  track.style.transform = `translateX(${offset}%)`;
}

next(row: number) {
  if (row === 1) {
    this.currentIndex1 = (this.currentIndex1 + 1) % (this.categories.length - this.visibleItems + 1);
    this.updateCarousel(1);
  } else {
    this.currentIndex2 = (this.currentIndex2 + 1) % (this.categories.length - this.visibleItems + 1);
    this.updateCarousel(2);
  }
}

prev(row: number) {
  if (row === 1) {
    this.currentIndex1 = this.currentIndex1 > 0 ? this.currentIndex1 - 1 : this.categories.length - this.visibleItems;
    this.updateCarousel(1);
  } else {
    this.currentIndex2 = this.currentIndex2 > 0 ? this.currentIndex2 - 1 : this.categories.length - this.visibleItems;
    this.updateCarousel(2);
  }
}
}



