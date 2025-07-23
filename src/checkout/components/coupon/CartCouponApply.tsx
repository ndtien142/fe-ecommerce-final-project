import React, { useCallback, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { ICouponValidationResult } from 'src/common/@types/coupon/coupon.interface';
import { fCurrency } from 'src/common/utils/formatNumber';
import Iconify from 'src/common/components/Iconify';
import { useValidateCoupons } from './hooks/useValidateCoupons';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { setAppliedCoupon, setCoupon } from 'src/checkout/checkout.slice';
import _debounce from 'lodash/debounce';
import { default as useMessage } from 'src/common/hooks/useMessage';

// ----------------------------------------------------------------------

interface CartCouponApplyProps {
  cartData: {
    subtotal: number;
    shippingFee: number;
    items: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>;
  };
  appliedCoupon?: ICouponValidationResult | null;
}

export default function CartCouponApply({ cartData }: CartCouponApplyProps) {
  const [couponCode, setCouponCode] = useState('');
  const { appliedCoupon } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const { mutate: validateCouponCode, isLoading: loading } = useValidateCoupons();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  // Debounced coupon validation
  const handleDebounceValidate = useCallback(
    _debounce((inputValue: string) => {
      if (!inputValue.trim()) return;
      const validationData = {
        code: inputValue,
        subtotal: cartData.subtotal,
        shippingFee: cartData.shippingFee,
        items: cartData.items,
      };
      validateCouponCode(validationData);
    }, 1000),
    [cartData, validateCouponCode]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    handleDebounceValidate(e.target.value);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    const validationData = {
      code: couponCode.trim().toUpperCase(),
      subtotal: cartData.subtotal,
      shippingFee: cartData.shippingFee,
      items: cartData.items,
    };
    console.log('Applying coupon with data:', validationData);
    validateCouponCode(validationData, {
      onSuccess: (result: ICouponValidationResult) => {
        setCouponCode(couponCode.trim().toUpperCase());
        dispatch(setCoupon(result?.metadata?.coupon || null));
        dispatch(setAppliedCoupon(result));
        showSuccessSnackbar(`Áp dụng mã "${result?.metadata?.coupon?.code}" thành công!`);
      },
      onError: (error: any) => {
        dispatch(setCoupon(null));
        dispatch(setAppliedCoupon(null));
        setCouponCode('');
        showErrorSnackbar(error?.response?.data?.message || 'Áp dụng mã giảm giá thất bại');
      },
    });
  };

  const handleRemoveCoupon = () => {
    dispatch(setCoupon(null));
    dispatch(setAppliedCoupon(null));
    setCouponCode('');
    showSuccessSnackbar('Đã xóa mã giảm giá');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <Box>
      {/* Applied Coupon Display */}
      {appliedCoupon && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          action={
            <IconButton color="inherit" size="small" onClick={handleRemoveCoupon}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          }
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2">
              ✓ Áp dụng mã "{appliedCoupon?.metadata?.coupon?.code}" thành công!
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">
                Giảm: {fCurrency(appliedCoupon?.metadata?.discount?.discountAmount || 0)}
              </Typography>
              {appliedCoupon?.metadata?.discount?.shippingDiscount > 0 && (
                <Typography variant="body2">
                  Giảm phí ship:{' '}
                  {fCurrency(appliedCoupon?.metadata?.discount?.shippingDiscount || 0)}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Alert>
      )}

      {/* Coupon Input */}
      {!appliedCoupon && (
        <Box>
          <Stack direction="row" spacing={1} mb={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Nhập mã giảm giá"
              value={couponCode}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <Iconify icon="eva:gift-outline" sx={{ color: 'text.secondary', mr: 1 }} />
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleApplyCoupon}
              disabled={loading || !couponCode.trim()}
              sx={{ minWidth: 100 }}
            >
              {loading ? <CircularProgress size={20} /> : 'Áp dụng'}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
