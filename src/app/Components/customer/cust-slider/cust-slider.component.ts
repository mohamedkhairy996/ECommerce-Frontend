import { Component, AfterViewInit, OnDestroy } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-cust-slider',
  standalone: true,
  templateUrl: './cust-slider.component.html',
  styleUrls: ['./cust-slider.component.css']
})
export class CustSliderComponent implements AfterViewInit, OnDestroy {
  private intervalId: any;

  ngAfterViewInit(): void {
    this.initSlider();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initSlider(): void {
    const $slides = $('.single-hero-slider');
    let currentIndex = 0;
    const totalSlides = $slides.length;
    const autoSlideInterval = 5000; // 5 seconds

    // Show first slide
    $($slides[0]).addClass('active');

    // Auto slide
    this.intervalId = setInterval(() => {
      this.nextSlide($slides, currentIndex, totalSlides);
      currentIndex = (currentIndex + 1) % totalSlides;
    }, autoSlideInterval);

    // Manual controls
    $('.custom-next').on('click', () => {
      this.nextSlide($slides, currentIndex, totalSlides);
      currentIndex = (currentIndex + 1) % totalSlides;
    });

    $('.custom-prev').on('click', () => {
      this.prevSlide($slides, currentIndex, totalSlides);
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    });
  }

  nextSlide($slides: any, currentIndex: number, totalSlides: number): void {
    $($slides[currentIndex]).removeClass('active');
    const nextIndex = (currentIndex + 1) % totalSlides;
    $($slides[nextIndex]).addClass('active');
  }

  prevSlide($slides: any, currentIndex: number, totalSlides: number): void {
    $($slides[currentIndex]).removeClass('active');
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    $($slides[prevIndex]).addClass('active');
  }
}