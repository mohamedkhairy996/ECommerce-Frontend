import { CategoryLinks } from "./category-links";

export interface Category {
  id: number;
  parentId: number;
  level: number;
  code: string;
  slug: string;
  name: string;
  banner: string;
  icon: string;
  numberOfChildren: number;
  links: CategoryLinks;
}
