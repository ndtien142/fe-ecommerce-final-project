import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ICoupon } from '../../common/@types/coupon/coupon.interface';
import { useCoupon } from '../hooks/useCoupon';
import CouponCard from './CouponCard';

// ----------------------------------------------------------------------

interface CouponListProps {
  onSelectCoupon?: (coupon: ICoupon) => void;
  selectedCoupon?: ICoupon;
  showPagination?: boolean;
  itemsPerPage?: number;
}

export default function CouponList({
  onSelectCoupon,
  selectedCoupon,
  showPagination = true,
  itemsPerPage = 6,
}: CouponListProps) {
  const { coupons, loading, error, pagination, fetchAvailableCoupons } = useCoupon();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    fetchAvailableCoupons({ page: value, limit: itemsPerPage });
  };

  const handleTypeFilter = (event: SelectChangeEvent<string>) => {
    const type = event.target.value;
    setFilterType(type);
    const params = { page: 1, limit: itemsPerPage };
    if (type !== 'all') {
      (params as any).type = type;
    }
    fetchAvailableCoupons(params);
    setCurrentPage(1);
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
          Mã giảm giá có sẵn
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Loại</InputLabel>
          <Select value={filterType} onChange={handleTypeFilter} label="Loại">
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="percent">Giảm %</MenuItem>
            <MenuItem value="fixed">Giảm tiền</MenuItem>
            <MenuItem value="free_shipping">Miễn phí ship</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Content */}
      {coupons.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary">
            Không có mã giảm giá nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hãy quay lại sau để tìm kiếm ưu đãi mới
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {coupons.map((coupon) => (
              <Grid item xs={12} sm={6} md={4} key={coupon.id}>
                <CouponCard
                  coupon={coupon}
                  onSelect={onSelectCoupon}
                  isSelected={selectedCoupon?.id === coupon.id}
                  canUse={coupon.isActive}
                />
              </Grid>
            ))}
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
