import { PaginationMeta } from '../common.interface';

export interface IUnitOfMeasure {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IListUnitOfMeasureResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    message: string;
    metadata: IUnitOfMeasure[];
    meta: PaginationMeta;
  };
}
