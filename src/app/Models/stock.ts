import { ProductStore } from "./product-store";

export interface Stock {
  id: number;
  name: string;
  description?: string;  // اختياري لأنه ممكن يبقى فاضي
  address?: string;      // نفس الكلام
  phone?: string;
  productStores?: ProductStore[]; // علاقة مع جدول ProductStores
}


