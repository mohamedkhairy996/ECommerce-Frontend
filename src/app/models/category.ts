import { CategoryLinks } from "./category-links";
import { CategoryTranslationDto } from "./category-translation-dto";

export interface Category {
  id: number;
  parentId?: number;
  level?: number;
  code?: string;
  slug?: string;
  name: string;
  banner?: string;
  icon?: string;
  numberOfChildren?: number;
  links?: CategoryLinks;
  categoryTranslations?: CategoryTranslationDto[]; // Corrected casing

}
