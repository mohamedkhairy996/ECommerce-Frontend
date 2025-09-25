export interface BrandTranslationDto {
  id: number;
  brandId: number; // snake_case to match C# property if mapped directly
  lang: string;
  name: string;
  // Add other translation properties if needed from the 'brand_translations' entity
}