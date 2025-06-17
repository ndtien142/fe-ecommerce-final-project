import { PaginationMeta } from '../common.interface';

export interface ILiquidationReceipt {
  id: number;
  userCode: string;
  liquidationDate: string; // yyyy-MM-dd
  createdAt: string;
  updatedAt: string;
  status: string; // "requested" | "approved" | "rejected"
  note: string;
  items: ILiquidationItem[];
}

export interface ILiquidationItem {
  serialNumber: string;
  deviceName?: string;
  quantity: number;
  unitPrice: number;
  note?: string;
}

export interface IListLiquidationReceiptResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: ILiquidationReceipt[];
    meta: PaginationMeta;
  };
}

export interface ILiquidationReceiptRequest {
  userCode: string;
  liquidationDate: string; // yyyy-MM-dd
  status?: string; // optional if handled by backend
  note?: string;
  items: {
    serialNumber: string;
    note?: string;
  }[];
}
