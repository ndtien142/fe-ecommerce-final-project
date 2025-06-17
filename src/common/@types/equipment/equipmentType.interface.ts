import { PaginationMeta } from '../common.interface';

export interface IEquipmentType {
  id: number;
  name: string;
  description: string;
  prefix: string;
  isActive: boolean;
}

export interface IListEquipmentTypeResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: IEquipmentType[];
    meta: PaginationMeta;
  };
}
