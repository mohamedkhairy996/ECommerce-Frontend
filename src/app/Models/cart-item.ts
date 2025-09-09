
import { Product } from './product';

export interface CartItem {
  id: number;
  productId: number;
  product: Product;           // ← كائن المنتج الكامل
  count: number;              // ← الكمية اللي المستخدم اختارها
  storeId: number;            // ← المخزن المحدد للمنتج
  applicationUserId: string;  // ← ID المستخدم
  availableQuantity: number;  // ← الجديد! الكمية المتوفرة فعلاً في المخزن
}
