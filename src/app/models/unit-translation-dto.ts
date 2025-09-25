// Based on the C# repository fetching 'unit_translations'
export interface UnitTranslationDto {
  id: number;
  unitId: number; // snake_case to match C# property if mapped directly
  lang: string;
  name: string;
  // Add other translation properties if needed from the 'unit_translations' entity
}