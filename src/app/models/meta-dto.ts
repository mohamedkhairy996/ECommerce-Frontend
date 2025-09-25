import { MetaLinkDto } from "./meta-link-dto";

export interface MetaDto {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  path: string;
  links: MetaLinkDto[];
}