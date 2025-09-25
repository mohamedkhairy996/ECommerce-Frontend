import { StoreTranslationDto } from "./store-translation-dto";

export interface StoreDto {
   id: number;
  localId: number;
  code: string;
  name: string; // store name
  type: string;
  longitude: number;
  latitude: number;
  branchId: number;
  setDefault: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  storeTranslations: StoreTranslationDto[]; // store.storeTranslations[0].name
}