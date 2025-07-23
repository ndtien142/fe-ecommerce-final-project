import { validateCoupon } from '../services/couponService';
import {
  ICouponValidationData,
  ICouponValidationResult,
} from '../../common/@types/coupon/coupon.interface';
import { useMutation } from 'react-query';

export const useCouponValidation = () => {
  const mutation = useMutation<ICouponValidationResult, any, ICouponValidationData>({
    mutationFn: validateCoupon,
  });

  const validateCouponCode = async (validationData: ICouponValidationData) => {
    try {
      const response = await mutation.mutateAsync(validationData);
      return response;
    } catch (err: any) {
      throw err;
    }
  };

  const clearValidation = () => {
    mutation.reset();
  };

  return {
    validationResult: mutation.data ?? null,
    loading: mutation.isLoading,
    error: mutation.error ? mutation.error.response?.data?.message || mutation.error.message : null,
    validateCouponCode,
    clearValidation,
  };
};
