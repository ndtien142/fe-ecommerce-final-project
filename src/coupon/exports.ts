// Export all coupon components for easy importing
export { default as CouponCard } from './components/CouponCard';
export { default as CouponList } from './components/CouponList';
export { default as UserCouponList } from './components/UserCouponList';
export { default as CouponSelector } from './components/CouponSelector';
export { default as CartCouponApply } from './components/CartCouponApply';
export { default as CheckoutCoupon } from './components/CheckoutCoupon';

// Export hooks
export { useCoupon } from './hooks/useCoupon';
export { useUserCoupons } from './hooks/useUserCoupons';
export { useCouponValidation } from './hooks/useCouponValidation';

// Export services
export * from './services/couponService';

// Export main page
export { default as CouponPage } from './index';
