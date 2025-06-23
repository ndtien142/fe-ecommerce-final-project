import { IProductApiResponse } from '../product/product.interface';

export interface IParamsAddToCart {
  productId: string;
  quantity: number;
  price: number;
}

export interface IParamsChangeItemQuantity {
  productId: string;
  quantity?: number;
}

export interface IParamsRemoveItemFromCart {
  productId: string;
}

export interface ICartLineItem {
  id: number;
  cartId: number;
  quantity: number;
  price: string;
  total: string;
  createTime: string;
  updateTime: string;
  productId: number;
  product: IProductApiResponse;
}

export interface ICart {
  id: number;
  userId: number;
  status: string;
  totalAmount: string;
  createTime: string;
  updateTime: string;
  lineItems: ICartLineItem[];
}

export interface ICartResponse {
  message: string;
  status: string;
  metadata: ICart;
}
