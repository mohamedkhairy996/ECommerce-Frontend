export interface OrderHeader {
  id: number;

  applicationUserId: string;
  

  orderDate: string;       // في Angular/DotNet الأفضل نستقبل Date كـ string من الـ API
  shippingDate: string;

  totalPrice: number;

  orderStatus?: string;
  paymentStatus?: string;

  trackingNumber?: string;
  carrier?: string;

  paymentDate: string;

  // Stripe Properties
  sessionId?: string;
  paymentIntentId?: string;

  // User Data
  name: string;
  address: string;
  city: string;
  phoneNumber?: string;
}


