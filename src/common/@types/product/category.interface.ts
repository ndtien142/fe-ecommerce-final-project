import { CustomFile } from 'src/common/components/upload';
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
  parent?: ICategory | null;
}

export interface IFormCreateNewCategory extends Omit<ICategory, 'id' | 'children' | 'imageUrl'> {
  imageUrl: CustomFile | string | null;
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

export interface ICategoryTreeResponse {
  message: string;
  status: string;
  metadata: ICategory[];
}
