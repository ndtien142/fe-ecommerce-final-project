import { PaginationMeta } from '../common.interface';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: string | null;
  imageUrl?: string | null;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface IListCategoriesResponse {
  message: string;
  status: string;
  metadata: {
    items: ICategory[];
    meta: PaginationMeta;
  };
}
