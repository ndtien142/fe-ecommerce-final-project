// Coupon system constants
export const COUPON_TYPES = {
  PERCENT: 'percent',
  FIXED: 'fixed',
  FREE_SHIPPING: 'free_shipping',
} as const;

export const COUPON_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  DRAFT: 'draft',
} as const;

export const COUPON_SCOPE = {
  GLOBAL: 'global',
  CATEGORY: 'category',
  PRODUCT: 'product',
  USER: 'user',
} as const;

export const VALIDATION_MESSAGES = {
  COUPON_NOT_FOUND: 'Mã giảm giá không tồn tại',
  COUPON_EXPIRED: 'Mã giảm giá đã hết hạn',
  COUPON_INACTIVE: 'Mã giảm giá không hoạt động',
  COUPON_USED_UP: 'Mã giảm giá đã hết lượt sử dụng',
  MINIMUM_ORDER_NOT_MET: 'Đơn hàng chưa đạt giá trị tối thiểu',
  MAXIMUM_DISCOUNT_EXCEEDED: 'Vượt quá giảm giá tối đa',
  COUPON_NOT_APPLICABLE: 'Mã giảm giá không áp dụng được',
  COUPON_VALID: 'Mã giảm giá hợp lệ',
} as const;

export const COUPON_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

export const COUPON_COLORS = {
  PERCENT: {
    primary: '#FF6B6B',
    light: '#FFE5E5',
    dark: '#CC5555',
  },
  FIXED: {
    primary: '#4ECDC4',
    light: '#E5F9F7',
    dark: '#3EA39C',
  },
  FREE_SHIPPING: {
    primary: '#45B7D1',
    light: '#E5F4F9',
    dark: '#3692A7',
  },
} as const;

export const COUPON_ICONS = {
  PERCENT: 'eva:percent-outline',
  FIXED: 'eva:minus-circle-outline',
  FREE_SHIPPING: 'eva:car-outline',
  EXPIRED: 'eva:clock-outline',
  USED: 'eva:checkmark-circle-outline',
} as const;

export const COUPON_QUERY_KEYS = {
  AVAILABLE_COUPONS: 'available-coupons',
  USER_COUPONS: 'user-coupons',
  COUPON_VALIDATION: 'coupon-validation',
  COUPON_DETAIL: 'coupon-detail',
} as const;

export const COUPON_FILTERS = {
  ALL: 'all',
  PERCENT: 'percent',
  FIXED: 'fixed',
  FREE_SHIPPING: 'free_shipping',
  EXPIRING_SOON: 'expiring_soon',
  HIGH_VALUE: 'high_value',
} as const;

export const DISCOUNT_THRESHOLDS = {
  HIGH_VALUE_PERCENT: 20, // 20% trở lên
  HIGH_VALUE_FIXED: 100000, // 100k trở lên
  EXPIRING_SOON_DAYS: 7, // 7 ngày trở lại
} as const;
