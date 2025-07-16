import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Stack,
  Typography,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';
import { useCouponValidation } from '../hooks/useCouponValidation';
import { ICouponValidationResult } from '../../common/@types/coupon/coupon.interface';
import { fCurrency } from '../../common/utils/formatNumber';
import Iconify from '../../common/components/Iconify';

// ----------------------------------------------------------------------

interface CartCouponApplyProps {
  onCouponApplied: (couponData: ICouponValidationResult) => void;
  onCouponRemoved: () => void;
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

export default function CartCouponApply({
  onCouponApplied,
  onCouponRemoved,
  cartData,
  appliedCoupon,
}: CartCouponApplyProps) {
  const [couponCode, setCouponCode] = useState('');
  const { validateCouponCode, loading, error, clearValidation } = useCouponValidation();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const validationData = {
        code: couponCode,
        subtotal: cartData.subtotal,
        shippingFee: cartData.shippingFee,
        items: cartData.items,
      };

      const result = await validateCouponCode(validationData);
      onCouponApplied(result);
      setCouponCode('');
    } catch (err) {
      console.error('Lỗi validate coupon:', err);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    clearValidation();
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
              ✓ Áp dụng mã "{appliedCoupon.coupon.code}" thành công!
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">
                Giảm: {fCurrency(appliedCoupon.discount.discountAmount)}
              </Typography>
              {appliedCoupon.discount.shippingDiscount > 0 && (
                <Typography variant="body2">
                  Giảm phí ship: {fCurrency(appliedCoupon.discount.shippingDiscount)}
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
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
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

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
