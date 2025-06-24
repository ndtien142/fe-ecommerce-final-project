export interface IPaymentMethod {
  id: number;
  name: string;
  provider: string;
  description: string;
  status: boolean;
  createTime: string;
  updateTime: string;
}

export interface IPaymentMethodResponse {
  message: string;
  status: string;
  metadata: IPaymentMethod[];
}
