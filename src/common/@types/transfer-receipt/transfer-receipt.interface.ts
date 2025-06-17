import { PaginationMeta } from '../common.interface';
import { IRoom } from '../department/department.interface';

export interface IListTransferReceiptResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: ITransferReceipts[];
    meta: PaginationMeta;
  };
}

export interface IDetailTransferReceiptResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: ITransferReceipts & { items?: ITransferReceiptItem[] };
  };
}

export interface ITransferReceipts {
  id: number;
  transferFrom: IRoom;
  transferTo: IRoom;
  transferDate: string;
  responsibleBy: IUserShort | null;
  approveBy: IUserShort | null;
  createdBy: IUserShort | null;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: ITransferReceiptItem[]; // Add this line
}

export interface ITransferReceiptItem {
  serialNumber: string;
  description: string;
  notes?: string | null;
  images: string[];
  type: {
    id: number;
    name: string;
  };
}

export interface IUserShort {
  userCode: string | null;
  username: string | null;
}

export interface ITransferReceiptParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  transferDate?: string;
  transferFromId?: number;
  transferToId?: number;
  userId?: number;
  status?: string;
  searchText?: string;
  searchCode?: string;
  searchSupplier?: string;
  searchStatus?: string;
  startDate?: string;
  endDate?: string;
}

export interface IEquipmentInTransfer {
  serialNumber: string;
  name: string;
  type: { id: number; name: string };
  description: string;
  status: string;
  images: string[];
}

export interface ITransferItemForm {
  serialNumber: string;
  notes: string;
}
