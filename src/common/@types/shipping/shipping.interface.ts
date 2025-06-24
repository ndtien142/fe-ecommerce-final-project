export interface IShippingMethod {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  status: boolean;
  createTime: string;
  updateTime: string;
}

export interface IShippingMethodResponse {
  message: string;
  status: string;
  metadata: IShippingMethod[];
}
