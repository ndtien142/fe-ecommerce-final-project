import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '../common/@types/cart/cart.interface';
import { IAddress } from '../common/@types/address/address.interface';
import { ICoupon, ICouponValidationResult } from 'src/common/@types/coupon/coupon.interface';
import { set } from 'lodash';

interface CheckoutState {
  activeStep: number;
  cartId: number | null;
  addressId: number | null;
  cart: ICart | null;
  address: IAddress | null;
  paymentMethodId: number | null; // Optional field for payment method
  shippingMethodId: number | null; // Optional field for shipping method
  coupon: ICoupon | null;
  appliedCoupon: ICouponValidationResult | null; // Optional field for applied coupon
}

const initialState: CheckoutState = {
  activeStep: 0,
  cartId: null,
  addressId: null,
  cart: null,
  address: null,
  paymentMethodId: null,
  shippingMethodId: null,
  coupon: null,
  appliedCoupon: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
    onNextStep(state) {
      state.activeStep += 1;
    },
    onPrevStep(state) {
      state.activeStep = Math.max(0, state.activeStep - 1);
    },
    setCartId(state, action: PayloadAction<number | null>) {
      state.cartId = action.payload;
    },
    setAddressId(state, action: PayloadAction<number | null>) {
      state.addressId = action.payload;
    },
    setCart(state, action: PayloadAction<ICart | null>) {
      state.cart = action.payload;
      state.cartId = action.payload ? action.payload.id : null;
    },
    setAddress(state, action: PayloadAction<IAddress | null>) {
      state.address = action.payload;
      state.addressId = action.payload ? action.payload.id : null;
    },
    setPaymentMethodId(state, action: PayloadAction<number | null>) {
      state.paymentMethodId = action.payload;
    },
    setShippingMethodId(state, action: PayloadAction<number | null>) {
      state.shippingMethodId = action.payload;
    },
    setCoupon(state, action: PayloadAction<ICoupon | null>) {
      state.coupon = action.payload;
    },
    setAppliedCoupon(state, action: PayloadAction<ICouponValidationResult | null>) {
      state.appliedCoupon = action.payload;
    },
    // Reset checkout state to initial values
    resetCheckout(state) {
      state.activeStep = 0;
      state.cartId = null;
      state.addressId = null;
      state.cart = null;
      state.address = null;
      state.paymentMethodId = null;
      state.shippingMethodId = null;
      state.coupon = null;
      state.appliedCoupon = null;
    },
  },
});

export const {
  setActiveStep,
  onNextStep,
  onPrevStep,
  setCartId,
  setAddressId,
  setCart,
  setAddress,
  resetCheckout,
  setPaymentMethodId,
  setShippingMethodId,
  setCoupon,
  setAppliedCoupon,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
