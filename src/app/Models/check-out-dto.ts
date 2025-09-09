import { OrderHeader } from "./order-header";

export interface CheckOutDTO {
    data:OrderHeader
    message:string
    success:boolean
}
