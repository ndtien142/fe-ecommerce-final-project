import { ICart } from '../cart/cart.interface';

export interface IFormCreateNewOrder {
  cart: ICart;
  addressId: number;
  paymentMethodId: number;
  shippingMethodId: number;
  note?: string;
  shippingFee?: number;
}
