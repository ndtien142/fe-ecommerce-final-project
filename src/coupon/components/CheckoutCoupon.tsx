import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Stack, Divider } from '@mui/material';
import { IUserCoupon, ICouponValidationResult } from '../../common/@types/coupon/coupon.interface';
import CouponSelector from './CouponSelector';
import CartCouponApply from './CartCouponApply';
import { fCurrency } from '../../common/utils/formatNumber';
import Iconify from '../../common/components/Iconify';

// ----------------------------------------------------------------------

interface CheckoutCouponProps {
  cartData: {
    subtotal: number;
    shippingFee: number;
    items: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>;
  };
  onCouponApplied: (coupon: IUserCoupon | ICouponValidationResult) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: IUserCoupon | ICouponValidationResult | null;
}

export default function CheckoutCoupon({
  cartData,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon,
}: CheckoutCouponProps) {
  const [openSelector, setOpenSelector] = useState(false);

  const handleOpenSelector = () => {
    setOpenSelector(true);
  };

  const handleCloseSelector = () => {
    setOpenSelector(false);
  };

  const handleCouponSelect = (userCoupon: IUserCoupon | null) => {
    if (userCoupon) {
      onCouponApplied(userCoupon);
    } else {
      onCouponRemoved();
    }
    setOpenSelector(false);
  };

  const handleCouponValidationApplied = (validationResult: ICouponValidationResult) => {
    onCouponApplied(validationResult);
  };

  const getCouponInfo = () => {
    if (!appliedCoupon) return null;

    // Check if it's a user coupon or validation result
    if ('coupon' in appliedCoupon) {
      return {
        code: appliedCoupon.coupon.code,
        name: appliedCoupon.coupon.name,
        discount: 'discount' in appliedCoupon ? appliedCoupon.discount : null,
      };
    }

    return null;
  };

  const couponInfo = getCouponInfo();

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="eva:gift-outline" width={20} height={20} />
            <Typography variant="h6">Mã giảm giá</Typography>
          </Stack>

          {/* Applied Coupon Display */}
          {couponInfo && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: 2,
                  bgcolor: 'success.lighter',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
              >
                <Stack>
                  <Typography variant="subtitle2" color="success.main">
                    ✓ {couponInfo.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {couponInfo.name}
                  </Typography>
                  {couponInfo.discount && (
                    <Typography variant="body2" color="success.main">
                      Giảm: {fCurrency(couponInfo.discount.discountAmount)}
                    </Typography>
                  )}
                </Stack>
                <Button
                  size="small"
                  color="inherit"
                  onClick={onCouponRemoved}
                  startIcon={<Iconify icon="eva:close-fill" width={16} height={16} />}
                >
                  Bỏ
                </Button>
              </Stack>
            </Box>
          )}

          {/* Coupon Actions */}
          {!appliedCoupon && (
            <Stack spacing={2}>
              {/* Manual Input */}
              <CartCouponApply
                cartData={cartData}
                onCouponApplied={handleCouponValidationApplied}
                onCouponRemoved={onCouponRemoved}
              />

              <Divider>
                <Typography variant="caption" color="text.secondary">
                  hoặc
                </Typography>
              </Divider>

              {/* Select from My Coupons */}
              <Button
                variant="outlined"
                onClick={handleOpenSelector}
                startIcon={<Iconify icon="eva:list-fill" width={16} height={16} />}
                fullWidth
              >
                Chọn từ mã của tôi
              </Button>
            </Stack>
          )}
        </Stack>
      </CardContent>

      {/* Coupon Selector Modal */}
      <CouponSelector
        open={openSelector}
        onClose={handleCloseSelector}
        onCouponSelect={handleCouponSelect}
        selectedCoupon={appliedCoupon as IUserCoupon}
        cartData={cartData}
      />
    </Card>
  );
}
