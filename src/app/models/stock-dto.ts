import { StoreDto } from "./store-dto";

export interface StockDto {
  id: number;
  productId: number;
  storeId: number; // storeId within stock
  branchId: number;
  sellerId: number;
  sku: string;
  price: number; // price within stock
  qty: number;
  stores: StoreDto; // Contains store details like name, translations
}