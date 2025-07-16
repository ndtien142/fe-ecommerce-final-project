import { useState } from 'react';
import { validateCoupon } from '../services/couponService';
import {
  ICouponValidationData,
  ICouponValidationResult,
} from '../../common/@types/coupon/coupon.interface';

export const useCouponValidation = () => {
  const [validationResult, setValidationResult] = useState<ICouponValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCouponCode = async (validationData: ICouponValidationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await validateCoupon(validationData);
      setValidationResult(response);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      setValidationResult(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearValidation = () => {
    setValidationResult(null);
    setError(null);
  };

  return {
    validationResult,
    loading,
    error,
    validateCouponCode,
    clearValidation,
  };
};
