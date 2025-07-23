import { PaginationMeta } from '../common.interface';

export interface ICoupon {
  id: number;
  code: string;
  name: string;
  description: string;
  type: 'percent' | 'fixed' | 'free_shipping';
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageLimitPerUser?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  firstOrderOnly?: boolean;
  applicableProducts?: number[];
  applicableCategories?: number[];
}

export interface IDetailCouponResponse {
  message: string;
  status: number;
  metadata: {
    coupon: ICoupon;
  };
}

export interface ICouponListResponse {
  message: string;
  status: number;
  metadata: {
    items: ICoupon[];
    meta: PaginationMeta;
  };
}
// ========= INTERFACES FOR USER COUPON =========
export interface IUserCoupon {
  id: number;
  userId: number;
  couponId: number;
  personalCode?: string;
  giftMessage?: string;
  usedCount: number;
  maxUsage: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  source: 'system_reward' | 'admin_gift' | 'promotion';
  coupon: ICoupon;
}

export interface ICouponValidationData {
  code: string;
  subtotal: number;
  shippingFee: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}

export interface ICouponValidationResult {
  message: string;
  status: number;
  metadata: {
    coupon: ICoupon;
    discount: {
      discountAmount: number;
      shippingDiscount: number;
    };
  };
}

export interface ICouponParams {
  page?: number;
  limit?: number;
  type?: 'percent' | 'fixed' | 'free_shipping';
}

export interface IUserCouponListResponse {
  message: string;
  status: number;
  metadata: { items: IUserCoupon[]; meta: PaginationMeta };
}

export interface ICouponGrantData {
  userId: number;
  couponId: number;
  personalCode?: string;
  giftMessage?: string;
  maxUsage: number;
  validFrom: string;
  validUntil: string;
  source: 'admin_gift' | 'system_reward' | 'promotion';
}
