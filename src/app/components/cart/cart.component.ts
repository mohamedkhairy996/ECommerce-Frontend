import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../Models/cart-response';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart!: CartResponse;
  shippingCost:number = 0;
  storeIDs !:number[];
  constructor(private _cartService:CartService) {}
  
  
  ngOnInit(): void {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res as CartResponse;
        console.log(this.cart);
        this.calculateShippingFromCart(); // ✅ نادي الدالة هنا
      },
      error: (err) => {
        console.error('Error loading cart', err);
        this.resetShipping(); // ✅ دالة لإعادة التعيين
      }
    });
  }

  // ✅ الدالة الخارجية (داخل الكومبوننت)
  calculateShippingFromCart(): void {
    const cartItems = this.cart?.data?.cartItems;

    if (Array.isArray(cartItems) && cartItems.length > 0) {
      // استخراج المتاجر بدون تكرار
      this.storeIDs = [...new Set(
        cartItems
          .map(item => item.storeId)
          .filter(id => id != null) // ✅ شيل القيم الفاضية
      )];
      this.shippingCost = this.storeIDs.length * 20;
    } else {
      this.resetShipping();
    }

    console.log('Store IDs:', this.storeIDs);
    console.log('Shipping Cost:', this.shippingCost);
  }

  // ✅ دالة مساعدة لإعادة التهيئة
  resetShipping(): void {
    this.storeIDs = [];
    this.shippingCost = 0;
  }


private updateTotal() {
    this.cart.data.totalPrice = this.cart.data.cartItems
      .reduce((sum, item) => sum + (item.product.price * item.count), 0);
      this.calculateShippingFromCart();
  }
  removeProductFromCart(cartItemId: number) {
    this._cartService.removeFromCart(cartItemId).subscribe({
      next: (res) => {
        // تحديث الكارت بعد الحذف
        this.cart.data.cartItems = this.cart.data.cartItems.filter(item => item.id !== cartItemId);
        this.updateTotal(); // تحديث subtotal بعد الحذف
      },
      error: (err) => {
        console.error('Error removing item from cart', err);
      }
    });
  }
 increaseCount(cartItemId: number) {
  const item = this.cart.data.cartItems.find(i => i.id === cartItemId);
  if (!item) return;

  this._cartService.increaseItemCount(cartItemId).subscribe({
    next: (res) => {
      // ✅ لو الزيادة نجحت — زود الكمية محلياً
      item.count += 1;
      this.updateTotal();
      
      // ✅ رسالة نجاح صغيرة (اختياري)
      Swal.fire({
        icon: 'success',
        title: 'تم التحديث!',
        text: 'تمت زيادة الكمية.',
        timer: 1000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    },
    error: (err) => {
      console.error('Error increasing item count', err);

      // ✅ عرض رسالة الخطأ اللي جاية من الـ API
      let errorMessage = 'فشل في زيادة الكمية. حاول مرة أخرى.';
      
      if (err?.error) {
        errorMessage = typeof err.error === 'string' ? err.error : 'الكمية غير متوفرة.';
      }

      Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: errorMessage,
        confirmButtonText: 'فهمت'
      });
    }
  });
}
  decreaseCount(cartItemId: number) {
    this._cartService.decreaseItemCount(cartItemId).subscribe({
      next: (res) => {
        // تحديث الكارت بعد النقصان
       
        const item = this.cart.data.cartItems.find(i => i.id === cartItemId);
        if (item && item.count > 1) item.count -= 1;
        else if (item && item.count === 1) 
          {
            this.cart.data.cartItems = this.cart.data.cartItems.filter(item => item.id !== cartItemId);
          }
           this.updateTotal(); // تحديث subtotal 
      },
      error: (err) => {
        console.error('Error decreasing item count', err);
      }
    });
  }
  


}
