import { CartItem } from "./cart-item";

export interface CartResponse {
    success: boolean;
  data: {
    cartItems: CartItem[];
    itemCount: number;
    totalPrice: number;

    };
}
