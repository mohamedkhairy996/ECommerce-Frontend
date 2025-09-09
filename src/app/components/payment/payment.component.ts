import { Component } from '@angular/core';
import { StripeService } from '../../services/stripe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: "./payment.component.html",
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
 isProcessing = false;

  constructor(private stripeService: StripeService) {}

  async pay() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    this.stripeService.createCheckoutSession(10.00, 'منتج تجريبي', 123).subscribe({
      next: async (response: any) => {
        await this.stripeService.redirectToCheckout(response.sessionId);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'فشل إنشاء جلسة الدفع',
          confirmButtonText: 'حسناً',
          timer:1500
        });
        this.isProcessing = false;
      }
    });
  }
}
