import { Component, OnInit } from '@angular/core';
import { CartResponse } from '../../Models/cart-response';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckOutDTO } from '../../Models/check-out-dto';
import { StripeService } from '../../services/stripe.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {
  cart!: CartResponse;
  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private _cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        console.log('Cart loaded:', this.cart);
      },
      error: (err) => {
        console.error('Error loading cart', err);
        Swal.fire({
          icon: 'error',
          title: 'فشل تحميل العربة',
          text: 'يرجى المحاولة لاحقاً',
          timer: 2000
        });
      }
    });

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      note: ['']
    });
  }

  async onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'خطأ في البيانات',
        text: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.',
        timer: 2000
      });
      return;
    }

    // 👇 تحقق من وجود منتجات في العربة
    if (!this.cart?.data?.cartItems || this.cart.data.cartItems.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'عربة فارغة',
        text: 'لا توجد منتجات في العربة لإتمام الطلب.',
        timer: 2000
      });
      return;
    }

    const formData = this.checkoutForm.value as CheckOutDTO;

    this._cartService.checkOut(formData).subscribe({
      next: (checkoutData: any) => {
        console.log('Checkout success:', checkoutData);

        Swal.fire({
          icon: 'success',
          title: 'تم إنشاء الطلب!',
          showConfirmButton: false,
          timer: 1000
        });

        // 👇 التوجه لجلسة الدفع
        this.stripeService.createCheckoutSession(
          checkoutData.data.totalPrice + 20,
          checkoutData.data.name,
          checkoutData.data.id
        ).subscribe({
          next: async (response: any) => {
            console.log('Stripe session created:', response.sessionId);
            await this.stripeService.redirectToCheckout(response.sessionId);
          },
          error: (err) => {
            console.error('Stripe error:', err);
            Swal.fire({
              icon: 'error',
              title: 'خطأ في الدفع',
              text: 'فشل إنشاء جلسة الدفع. يرجى المحاولة لاحقاً',
              timer: 1500
            });
          }
        });
      },
      error: (err) => {
        console.error('Checkout error:', err);

        // 👇 عرض رسالة الخطأ مع أسماء المنتجات والمخازن الغير متوفرة
        if (err?.error?.outOfStockProducts && Array.isArray(err.error.outOfStockProducts)) {
          const outOfStockProducts = err.error.outOfStockProducts as { productName: string; storeName: string }[];

          Swal.fire({
            icon: 'warning',
            title: 'منتجات غير متوفرة!',
            html: `
              <p>المنتجات التالية غير متوفرة في المخازن المحددة:</p>
              <ul style="text-align: right; direction: rtl; margin: 0; padding-right: 20px; font-size: 1.1rem;">
                ${outOfStockProducts
                  .map(
                    item =>
                      `<li>
                        <strong style="color: #2c3e50;">${item.productName}</strong>
                        <span style="color: #e74c3c; font-weight: 500;"> — ${item.storeName}</span>
                       </li>`
                  )
                  .join('')}
              </ul>
              <p style="margin-top: 20px; font-weight: 500; color: #7f8c8d;">
                يرجى تعديل العربة والمحاولة مرة أخرى.
              </p>
            `,
            confirmButtonText: 'تعديل العربة',
            confirmButtonColor: '#e74c3c',
            customClass: {
              popup: 'rtl-swal',
              title: 'rtl-title',
              htmlContainer: 'rtl-html'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/cart']);
            }
          });
        } else {
          // 👇 رسالة خطأ عامة
          let errorMessage = 'حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة لاحقاً';
          if (err?.error?.message) {
            errorMessage = err.error.message;
          }

          Swal.fire({
            icon: 'error',
            title: 'فشل الطلب',
            text: errorMessage,
            confirmButtonText: 'فهمت',
            confirmButtonColor: '#3498db'
          });
        }
      }
    });
  }
}