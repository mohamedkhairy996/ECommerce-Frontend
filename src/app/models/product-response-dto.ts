import { LinksDto } from "./links-dto";
import { MetaDto } from "./meta-dto";
import { ProductDataDto } from "./product-data-dto";

export interface ProductResponseDto {
  // Note: The JSON key is 'data', so the interface property should be 'data'
  data: ProductDataDto[]; // Array of products
  links: LinksDto;
  meta: MetaDto;
  success: boolean;
  status: number;
  storeId: string; // Note: It's a string in the JSON
  userId: string;   // Note: It's a string in the JSON
}