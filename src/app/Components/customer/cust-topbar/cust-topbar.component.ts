import { Component, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-cust-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cust-topbar.component.html',
  styleUrls: ['./cust-topbar.component.css']
})
export class CustTopbarComponent implements AfterViewInit {
languages = [
    { code: 'en', label: 'English' },
    { code: 'eg', label: 'Arabic'  },
  ];

  currentLang = this.languages[0];
  /**
   *
   */
    constructor(private langService: LanguageService) {
    const saved = this.langService.getLanguage();
    const found = this.languages.find(l => l.code === saved);
    console.log(saved);
    console.log(found);
    if (found) this.currentLang = found;
  }

  setLang(code: string) {
    this.langService.setLanguage(code);
    const found = this.languages.find(l => l.code === code);
    console.log(found);
    if (found) this.currentLang = found;
  }
  
  ngAfterViewInit(): void {
    this.startNewsSlider();
  }

  startNewsSlider(): void {
    const $slider = $('#news-flash ul');
    const $items = $slider.find('li');
    let index = 0;
    const total = $items.length;
    const height = 30; // height of one item

    setInterval(() => {
      index = (index + 1) % total;
      $slider.css('top', -index * height + 'px');
    }, 3000); // Change every 3 seconds
  }
}