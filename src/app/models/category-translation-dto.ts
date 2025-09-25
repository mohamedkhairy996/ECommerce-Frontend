export interface CategoryTranslationDto {
  id: number;
  categoryId: number; // snake_case to match C# property if mapped directly
  lang: string;
  name: string;
  // Add other translation properties if needed from the 'category_translations' entity
}