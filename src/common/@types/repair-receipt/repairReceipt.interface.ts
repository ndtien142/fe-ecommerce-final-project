import { PaginationMeta } from '../common.interface';

export interface IRepairReceipt {
  id: number;
  userCode: string;
  startDate: string;     // yyyy-MM-dd
  endDate: string;       // yyyy-MM-dd
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'repairing' | 'completed';
  responsiblePerson?: string;
  note?: string;
  items: IRepairItem[];
}

export interface IRepairItem {
  serialNumber: string;
  deviceName?: string;
  errorDescription?: string;
  solution?: string;
  cost?: number;
  note?: string;
}

export interface IRepairReceiptRequest {
  userCode: string;
  startDate: string;
  endDate: string;
  status?: 'pending' | 'repairing' | 'completed'; // optional if backend assigns
  responsiblePerson?: string;
  note?: string;
  items: {
    serialNumber: string;
    errorDescription?: string;
    solution?: string;
    cost?: number;
    note?: string;
  }[];
}

export interface IListRepairReceiptResponse {
  status: number;
  message: string;
  metadata: {
    code: number;
    metadata: IRepairReceipt[];
    meta: PaginationMeta;
  };
}
