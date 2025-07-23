import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Stack, Divider } from '@mui/material';
import { fCurrency } from 'src/common/utils/formatNumber';
import Iconify from 'src/common/components/Iconify';
import ModalSelectCoupon from './ModalSelectCoupon';
import CartCouponApply from './CartCouponApply';
import { dispatch, useSelector } from 'src/common/redux/store';
import { setAppliedCoupon, setCoupon } from 'src/checkout/checkout.slice';
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
}

export default function CheckoutCoupon({ cartData }: CheckoutCouponProps) {
  const [openSelector, setOpenSelector] = useState(false);

  const { coupon: selectedCoupon, appliedCoupon } = useSelector((state) => state.checkout);

  const handleOpenSelector = () => {
    setOpenSelector(true);
  };

  const handleCloseSelector = () => {
    setOpenSelector(false);
  };

  const handleCouponRemoved = () => {
    dispatch(setCoupon(null));
    dispatch(setAppliedCoupon(null));
  };

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
          {selectedCoupon && (
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
                    ✓ {selectedCoupon.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCoupon.name}
                  </Typography>
                  {appliedCoupon?.metadata?.discount && (
                    <Typography variant="body2" color="success.main">
                      Giảm: {fCurrency(appliedCoupon?.metadata?.discount?.discountAmount || 0)}
                    </Typography>
                  )}
                </Stack>
                <Button size="small" color="inherit" onClick={handleCouponRemoved}>
                  <Iconify icon="eva:trash-outline" color={'red'} width={16} height={16} />
                </Button>
              </Stack>
            </Box>
          )}

          {!selectedCoupon && (
            <Stack spacing={2}>
              {/* Manual Input */}
              <CartCouponApply cartData={cartData} />

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
      <ModalSelectCoupon open={openSelector} onClose={handleCloseSelector} cartData={cartData} />
    </Card>
  );
}
