// Based on the C# repository fetching 'store_translations'
export interface StoreTranslationDto {
  id: number;
  storeId: number; // snake_case to match C# property if mapped directly (C# long)
  lang: string;
  name: string;
  // Add other translation properties if needed from the 'store_translations' entity
}