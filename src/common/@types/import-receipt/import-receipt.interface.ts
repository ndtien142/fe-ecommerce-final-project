import { PaginationMeta } from '../common.interface';
import { ISupplier } from './supplier.interface';

export interface IImportReceipt {
  id: number;
  name: string;
  dateOfOrder: string;
  dateOfReceived: string;
  dateOfActualReceived: string | null;
  status: string;
  note: string;
  supplier: ISupplier;
  requestedUser: IRequestUser;
  items: IImportReceiptItem[];
}

export interface IImportReceiptItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IRequestUser {
  code: string;
  username: string;
  email: string | null;
  isActive: boolean;
}

export interface IListImportReceiptResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: IImportReceipt[];
    meta: PaginationMeta;
  };
}

export interface IImportReceiptParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  dateOfOrder?: string;
  dateOfReceived?: string;
  dateOfActualReceived?: string;
  status?: string;
  supplierId?: number;
  requestedUserId?: number;
  searchText?: string;
}
