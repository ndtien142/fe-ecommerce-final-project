export interface IAddress {
  id: number;
  title: string;
  country: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  streetNumber: string;
  receiverName: string;
  phoneNumber: string;
  isDefault: boolean;
  status: string;
}

export interface IAddressForm {
  title: string;
  country: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  streetNumber: string;
  receiverName: string;
  phoneNumber: string;
  isDefault?: boolean;
}

export interface IAddressResponse {
  message: string;
  status: string;
  metadata: IAddress[];
}
