export interface IEquipmentGroupDetail {
  code: string;
  name: string;
  description: string | null;
  unitOfMeasure: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    name: string;
  };
  manufacturer: {
    id: number;
    name: string;
  };
  images: string[];
  equipments: IEquipmentSerial[];
  isDeleted: boolean;
  isActive: boolean;
}

export interface IEquipmentSerial {
  serialNumber: string;
  description: string;
  location: string | null;
  status: 'in_use' | 'available' | string;
  dayOfFirstUse: string | null;
  room?: {
    id?: string;
    name?: string;
    note?: string;
    status?: boolean;
    department?: {
      id?: string;
      name?: string;
    };
  };
}

export interface IEquipmentDetailBySerial {
  serialNumber: string;
  dayOfFirstUse: string | null;
  description: string | null;
  location: string | null;
  status: string;
  importReceipt?: {
    id: number;
    price?: string;
    userRequested?: {
      userCode: string;
      username: string;
      email: string | null;
      phone: string | null;
    };
    approvedBy?: {
      userCode: string;
      username: string;
      email: string | null;
      phone: string | null;
    } | null;
    receivedAt: string;
    note: string;
    supplier?: {
      name: string;
      address: string;
      description?: string;
      phone?: string;
      email?: string;
    };
  };
  groupEquipment?: {
    code: string;
    name: string;
  };
  room?: {
    id: string;
    name: string;
    note: string;
    status: boolean;
    department: {
      id: string;
      name: string;
    };
  };
  images?: string[];
}

export interface IDetailEquipmentSerialResponse {
  message: string;
  status: number;
  metadata: {
    code: number;
    message: string;
    metadata: IEquipmentDetailBySerial;
  };
}

export interface IGetEquipmentGroupDetailResponse {
  message: string;
  status: number;
  metadata: {
    code: number;
    message: string;
    metadata: IEquipmentGroupDetail;
  };
}
