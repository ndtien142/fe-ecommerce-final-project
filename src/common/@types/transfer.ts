// ----------------------------------------------------------------------

export interface TransferAddress {
  id: string;
  name: string;
  address: string;
  company: string;
  email: string;
  phone: string;
}

export interface TransferItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  service: string;
}

export interface Transfer {
  id: string;
  sent: number;
  status: string;
  totalPrice: number;
  transferNumber: string;
  subTotalPrice: number;
  taxes: number | string;
  discount: number | string;
  transferFrom: TransferAddress;
  transferTo: TransferAddress;
  createDate: Date | number;
  dueDate: Date | number;
  items: TransferItem[];
}
