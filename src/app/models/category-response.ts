import { Category } from "./category";

export interface CategoryResponse {
  data: Category[];
  success: boolean;
  status: number;
}