import { BrandDto } from "./brand-dto";
import { Category } from "./category";
import { StockDto } from "./stock-dto";
import { UnitDto } from "./unit-dto";
import { VariantDto } from "./variant-dto";

 export interface ProductDataDto {
  id: number;
  name: string; // product name
  barcode: string;
  photos:string;
  slug: string;
  category: Category; // category.id, category.parentId, category.categoryTranslations
  brand: BrandDto; // brand.id, brand.brandTranslations
  variant?: VariantDto; // variant.id, variant.name, etc.
  unit: UnitDto; // unit.id, unit.name
  stock: StockDto[]; // price, storeId within stock items
  thumbnailImage?: string; // Not requested but present in JSON
  hasDiscount: boolean;
  discount: string;
  strokedPrice: number; // Not requested but present in JSON
  mainPrice: number; // Not requested but likely the price
  rating: number;
  sales: number;
  isWholesale: boolean;
  isInCart: boolean;
  isInWishlist: boolean;
  published: boolean;
  approved: boolean;
  status: boolean;
  isUser: boolean;
  links: {
    details: string;
  };
}



