import { BrandTranslationDto } from "./brand-translation-dto";

export interface BrandDto {
  id: number;
  name: string; // Potentially translated name
  // Add other brand properties if needed from the 'brands' entity
  brandTranslations?: BrandTranslationDto[]; // Corrected casing
}