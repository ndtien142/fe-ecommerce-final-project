import { PaginationMeta } from '../common.interface';

export interface ISupplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface IListSupplierResponse {
  status: string;
  message: string;
  metadata: {
    metadata: ISupplier[];
    meta: PaginationMeta;
  };
}
