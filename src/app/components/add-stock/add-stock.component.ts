import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
  imports: [ReactiveFormsModule , CommonModule]
})
export class AddStockComponent implements OnInit {

  storeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      address: [''],
      phone: ['']
    });
  }

  onSubmit(): void {
    if (this.storeForm.invalid) return;

    this.stockService.addStock(this.storeForm.value).subscribe(() => {
      Swal.fire({
  title: 'تم الإضافة!',
  text: 'تم إضافة المخزن.',
  icon: 'success',
  timer: 1500, // يختفي بعد 1.5 ثانية
  showConfirmButton: false, // مفيش زر OK — يشتغل تلقائي
  toast: true, // يظهر كـ notification صغيرة
  position: 'top-end', // في الأعلى جهة اليمين
  customClass: {
    popup: 'swal-toast' // لو حابب تضيف كلاس مخصص
  }
});
      this.router.navigate(['/admin/products']);
    });
  }
}
