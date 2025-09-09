
export interface Order {
  id: number;
  name: string;
  email?: string; // لو مش موجود، نستخدم null
  phoneNumber: string;
  orderStatus: string; // orderStatus
  status: string; // orderStatus
  totalPrice: number;
  orderDate: string;
  city: string;
  address: string;
  paymentStatus: string;
  applicationUserId: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  orderItems?: OrderItem[]; // ممكن تحدد نوع أدق لو عايز
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}
