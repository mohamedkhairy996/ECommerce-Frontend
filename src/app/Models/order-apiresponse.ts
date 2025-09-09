import { Order } from "./order";

export interface OrderAPIResponse {
    success: boolean;
  data: Order[];
}
