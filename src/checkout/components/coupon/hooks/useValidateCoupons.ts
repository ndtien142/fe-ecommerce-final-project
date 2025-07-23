import { useMutation } from 'react-query';
import { validateSystemCoupon } from '../service';

export const useValidateCoupons = () => useMutation(validateSystemCoupon);
