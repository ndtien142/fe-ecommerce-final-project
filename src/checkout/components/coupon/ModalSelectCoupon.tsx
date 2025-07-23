import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import Iconify from 'src/common/components/Iconify';
import { useGetSystemCoupon } from './hooks/useGetSystemCoupon';
import SystemCardCoupon from './SystemCardCoupon';
// ----------------------------------------------------------------------

interface CouponSelectorProps {
  cartData: {
    subtotal: number;
    shippingFee: number;
    items: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>;
  };
  open: boolean;
  onClose: () => void;
}

export default function ModalSelectCoupon({ cartData, open, onClose }: CouponSelectorProps) {
  const { data: systemCouponData, isLoading: systemCouponLoading } = useGetSystemCoupon();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Chọn mã giảm giá</Typography>
          <IconButton onClick={onClose} size="small">
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        {systemCouponLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : systemCouponData?.items?.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Iconify icon="eva:gift-outline" width={64} height={64} color="text.secondary" />
            <Typography variant="h6" color="text.secondary" mt={2}>
              Không có mã giảm giá khả dụng
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn chưa có mã giảm giá nào có thể sử dụng cho đơn hàng này
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {systemCouponData?.items?.map((userCoupon, index) => (
              <Grid item xs={12} sm={6} key={userCoupon.id}>
                <SystemCardCoupon cartData={cartData} coupon={userCoupon} canUse={true} />
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
