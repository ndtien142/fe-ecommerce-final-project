import { PaginationMeta } from '../common.interface';

export interface IManufacturer {
  id: number;
  name: string;
  prefix: string;
  contactInfo: string;
  address: string;
  isActive: string;
}

export interface IListManufacturerResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: IManufacturer[];
    meta: PaginationMeta;
  };
}
