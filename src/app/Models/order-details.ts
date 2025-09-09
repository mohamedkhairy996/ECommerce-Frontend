import { OrderHeader } from "./order-header";
import { Product } from "./product";

export interface OrderDetails {
     id: number;

  orderHeaderId: number;
  orderHeader?: OrderHeader;   // لو عندك IOrder من اللي عملناه قبل كده

  productId: number;
  product?: Product;     // لو عندك IProduct Interface في Angular

  price: number;
  count: number;
}
