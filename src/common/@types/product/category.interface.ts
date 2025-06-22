import { PaginationMeta } from '../common.interface';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  sortOrder: number;
  parentId?: string | null;
  imageUrl?: string | null;
  status: 'active' | 'inactive';
  children: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

export type IFlattenedCategory = ICategory & { ancestorIds: string[] };

export interface IListCategoriesResponse {
  message: string;
  status: string;
  metadata: {
    items: ICategory[];
    meta: PaginationMeta;
  };
}
