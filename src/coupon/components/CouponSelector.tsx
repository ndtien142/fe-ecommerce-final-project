import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { IUserCoupon } from '../../common/@types/coupon/coupon.interface';
import { useUserCoupons } from '../hooks/useUserCoupons';
import CouponCard from './CouponCard';
import Iconify from '../../common/components/Iconify';

// ----------------------------------------------------------------------

interface CouponSelectorProps {
  onCouponSelect: (userCoupon: IUserCoupon | null) => void;
  selectedCoupon?: IUserCoupon | null;
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

export default function CouponSelector({
  onCouponSelect,
  selectedCoupon,
  cartData,
  open,
  onClose,
}: CouponSelectorProps) {
  const { userCoupons, loading, error, fetchUserCoupons } = useUserCoupons();
  const [availableCoupons, setAvailableCoupons] = useState<IUserCoupon[]>([]);

  useEffect(() => {
    if (open) {
      fetchUserCoupons();
    }
  }, [open]);

  useEffect(() => {
    // Filter coupons that can be used with current cart
    const filtered = userCoupons.filter((userCoupon) => {
      const coupon = userCoupon.coupon;

      // Check if coupon is active and not expired
      if (!userCoupon.isActive || userCoupon.usedCount >= userCoupon.maxUsage) {
        return false;
      }

      // Check validity period
      const now = new Date();
      const validFrom = new Date(userCoupon.validFrom || coupon.startDate);
      const validUntil = new Date(userCoupon.validUntil || coupon.endDate);

      if (now < validFrom || now > validUntil) {
        return false;
      }

      // Check minimum order amount
      if (coupon.minOrderAmount && cartData.subtotal < coupon.minOrderAmount) {
        return false;
      }

      return true;
    });

    setAvailableCoupons(filtered);
  }, [userCoupons, cartData]);

  const handleCouponSelect = (coupon: any) => {
    // Find the user coupon that matches this coupon
    const userCoupon = availableCoupons.find((uc) => uc.coupon.id === coupon.id);
    if (userCoupon) {
      onCouponSelect(userCoupon);
    }
  };

  const handleClearSelection = () => {
    onCouponSelect(null);
  };

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
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : availableCoupons.length === 0 ? (
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
            {availableCoupons.map((userCoupon) => (
              <Grid item xs={12} sm={6} key={userCoupon.id}>
                <CouponCard
                  coupon={userCoupon.coupon}
                  onSelect={handleCouponSelect}
                  isSelected={selectedCoupon?.id === userCoupon.id}
                  canUse={true}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClearSelection} color="inherit">
          Bỏ chọn
        </Button>
        <Button onClick={onClose} variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
