import { OrderDetails } from "./order-details"
import { OrderHeader } from "./order-header"

export interface OrderDetailsDto {
    orderHeader:OrderHeader
    orderDetails:OrderDetails[]
}
