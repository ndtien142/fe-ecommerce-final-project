// Export all coupon components for easy importing
export { default as CouponList } from './components/CouponList';

// Export hooks
export { useCoupon } from './hooks/useCoupon';
export { useUserCoupons } from './hooks/useUserCoupons';
export { useCouponValidation } from './hooks/useCouponValidation';

// Export services
export * from './services/couponService';

// Export main page
export { default as CouponPage } from './index';
