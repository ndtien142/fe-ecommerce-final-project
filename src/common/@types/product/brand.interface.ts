import { CustomFile } from 'src/common/components/upload';
import { PaginationMeta } from '../common.interface';

export interface BrandFormValues {
  name: string;
  description: string;
  logoUrl: File | null;
  status: string;
}

export interface BrandFormValuesProps extends Omit<BrandFormValues, 'logoUrl'> {
  logoUrl: CustomFile | string | null;
}

export interface IBrand {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  status: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
}

export interface IListBrandResponse {
  message: string;
  status: string;
  metadata: {
    items: IBrand[];
    meta: PaginationMeta;
  };
}
