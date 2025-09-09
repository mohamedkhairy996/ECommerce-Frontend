import { ProductStore } from "./product-store"

export interface Product {
    id:number,
    name:string,
    price:number,
    description:string,
    imageData?:string
    stocks:ProductStore[]
    isInStock?: boolean; // ✅ نضيفها هنا
    availableStoreIds?:number[]
}

