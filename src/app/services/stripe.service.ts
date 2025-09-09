import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

   private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    // استبدل المفتاح العام بمفتاحك من Stripe Dashboard
    this.stripePromise = loadStripe('pk_test_51S3NueAVpXF56Emu8xkEGRFyek8szTNFrJGRXQorHFAH718egYjzLlD5kbvf0xpwOjNeJZyAU3yVniiyXm5oHewW00lnUE77KM');
  }

  createCheckoutSession(amount: number, productName: string, orderId: number): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Stripe/checkoutSession`, {
      amount,
      productName,
      orderId
    });
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('فشل تحميل Stripe');
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId
    });

    if (error) {
      console.error('فشل التوجيه لصفحة الدفع:', error.message);
      alert('حدث خطأ: ' + error.message);
    }
  }
}
