import { ISupplier } from './supplier.interface';

export interface IImportReceiptDetail {
  id: number;
  name: string | null;
  dateOfOrder: string;
  dateOfReceived: string;
  dateOfActualReceived: string | null;
  status: string;
  note: string;
  supplier: ISupplier;
  requestedUser: IRequestUser;
  approvedBy: IRequestUser;
  items: IImportReceiptDetailItem[];
  equipments: IImportReceiptDetailEquipment[];
}

export interface IImportReceiptDetailItem {
  code: string;
  name: string;
  price: string | number;
  quantity: number;
}

export interface IImportReceiptDetailEquipment {
  serialNumber: string;
  description: string;
  status: string;
  groupCode: string;
  groupName: string;
  roomName: string | null;
}

export interface IRequestUser {
  code: string;
  username: string;
  email: string | null;
  isActive: boolean;
}

export interface IImportReceiptDetailResponse {
  message: string;
  status: number;
  metadata: {
    code: number;
    message: string;
    metadata: IImportReceiptDetail | null;
  };
}
