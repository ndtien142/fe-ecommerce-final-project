import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { IUserCoupon } from '../../common/@types/coupon/coupon.interface';
import { useUserCoupons } from '../hooks/useUserCoupons';
import CouponCard from './CouponCard';

// ----------------------------------------------------------------------

interface UserCouponListProps {
  onSelectCoupon?: (userCoupon: IUserCoupon) => void;
  selectedCoupon?: IUserCoupon;
  showPagination?: boolean;
  itemsPerPage?: number;
}

export default function UserCouponList({
  onSelectCoupon,
  selectedCoupon,
  showPagination = true,
  itemsPerPage = 6,
}: UserCouponListProps) {
  const { userCoupons, loading, error, pagination, fetchUserCoupons } = useUserCoupons();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    fetchUserCoupons({ page: value, limit: itemsPerPage });
  };

  const handleCouponSelect = (coupon: any) => {
    // Find the user coupon that matches this coupon
    const userCoupon = userCoupons.find((uc) => uc.coupon.id === coupon.id);
    if (userCoupon && onSelectCoupon) {
      onSelectCoupon(userCoupon);
    }
  };

  const getStatusChip = (userCoupon: IUserCoupon) => {
    const now = new Date();
    const validUntil = new Date(userCoupon.validUntil || userCoupon.coupon.endDate);
    const canUse = userCoupon.isActive && userCoupon.usedCount < userCoupon.maxUsage;

    if (!canUse) {
      return <Chip label="Đã sử dụng" color="default" size="small" />;
    }

    if (now > validUntil) {
      return <Chip label="Hết hạn" color="error" size="small" />;
    }

    return <Chip label="Có thể sử dụng" color="success" size="small" />;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Mã giảm giá của tôi
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tổng cộng: {userCoupons.length} mã
        </Typography>
      </Stack>

      {/* Content */}
      {userCoupons.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary">
            Bạn chưa có mã giảm giá nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hãy mua sắm để nhận thêm nhiều ưu đãi hấp dẫn
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {userCoupons.map((userCoupon) => {
              const now = new Date();
              const validUntil = new Date(userCoupon.validUntil || userCoupon.coupon.endDate);
              const canUse =
                userCoupon.isActive &&
                userCoupon.usedCount < userCoupon.maxUsage &&
                now <= validUntil;

              return (
                <Grid item xs={12} sm={6} md={4} key={userCoupon.id}>
                  <Box>
                    <CouponCard
                      coupon={userCoupon.coupon}
                      onSelect={onSelectCoupon ? handleCouponSelect : undefined}
                      isSelected={selectedCoupon?.id === userCoupon.id}
                      canUse={canUse}
                      disabled={!canUse}
                    />

                    {/* User Coupon Info */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                    >
                      {getStatusChip(userCoupon)}
                      <Typography variant="caption" color="text.secondary">
                        Đã dùng: {userCoupon.usedCount}/{userCoupon.maxUsage}
                      </Typography>
                    </Stack>

                    {/* Gift Message */}
                    {userCoupon.giftMessage && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                      >
                        💝 {userCoupon.giftMessage}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          {showPagination && pagination && pagination.totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={pagination.totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
