import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Box, Stack } from '@mui/material';
import { ICoupon } from '../../common/@types/coupon/coupon.interface';
import { fDate } from '../../common/utils/formatTime';
import { fCurrency } from '../../common/utils/formatNumber';
import Iconify from '../../common/components/Iconify';

// ----------------------------------------------------------------------

interface CouponCardProps {
  coupon: ICoupon;
  onSelect?: (coupon: ICoupon) => void;
  isSelected?: boolean;
  canUse?: boolean;
  disabled?: boolean;
}

export default function CouponCard({
  coupon,
  onSelect,
  isSelected = false,
  canUse = true,
  disabled = false,
}: CouponCardProps) {
  const formatDiscount = (type: string, value: number) => {
    switch (type) {
      case 'percent':
        return `${value}%`;
      case 'fixed':
        return fCurrency(value);
      case 'free_shipping':
        return 'Miễn phí ship';
      default:
        return value;
    }
  };

  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'percent':
        return 'eva:percent-outline';
      case 'fixed':
        return 'eva:credit-card-outline';
      case 'free_shipping':
        return 'eva:car-outline';
      default:
        return 'eva:gift-outline';
    }
  };

  const getDiscountColor = (type: string) => {
    switch (type) {
      case 'percent':
        return 'error';
      case 'fixed':
        return 'success';
      case 'free_shipping':
        return 'info';
      default:
        return 'primary';
    }
  };

  const handleClick = () => {
    if (canUse && !disabled && onSelect) {
      onSelect(coupon);
    }
  };

  return (
    <Card
      sx={{
        cursor: canUse && !disabled ? 'pointer' : 'not-allowed',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        bgcolor: isSelected ? 'primary.lighter' : 'background.paper',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          ...(canUse &&
            !disabled && {
              borderColor: 'primary.main',
              boxShadow: (theme) => theme.shadows[8],
            }),
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'primary.lighter',
              px: 1,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" color="primary.main" fontFamily="monospace">
              {coupon.code}
            </Typography>
          </Box>

          <Chip
            icon={<Iconify icon={getDiscountIcon(coupon.type)} width={16} height={16} />}
            label={formatDiscount(coupon.type, coupon.value)}
            color={getDiscountColor(coupon.type) as any}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Stack>

        {/* Content */}
        <Typography variant="h6" gutterBottom noWrap>
          {coupon.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {coupon.description}
        </Typography>

        {/* Conditions */}
        <Stack spacing={0.5} mb={2}>
          {coupon.minOrderAmount && (
            <Typography variant="caption" color="text.secondary">
              • Đơn tối thiểu: {fCurrency(coupon.minOrderAmount)}
            </Typography>
          )}
          {coupon.maxDiscountAmount && coupon.type === 'percent' && (
            <Typography variant="caption" color="text.secondary">
              • Giảm tối đa: {fCurrency(coupon.maxDiscountAmount)}
            </Typography>
          )}
          {coupon.usageLimitPerUser && (
            <Typography variant="caption" color="text.secondary">
              • Số lần sử dụng: {coupon.usageLimitPerUser}
            </Typography>
          )}
          {coupon.firstOrderOnly && (
            <Typography variant="caption" color="text.secondary">
              • Chỉ áp dụng đơn hàng đầu tiên
            </Typography>
          )}
        </Stack>

        {/* Footer */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            HSD: {fDate(coupon.endDate)}
          </Typography>

          {canUse && onSelect && (
            <Button
              variant={isSelected ? 'contained' : 'outlined'}
              size="small"
              disabled={disabled}
              startIcon={
                isSelected ? (
                  <Iconify icon="eva:checkmark-circle-2-fill" width={16} height={16} />
                ) : (
                  <Iconify icon="eva:plus-circle-outline" width={16} height={16} />
                )
              }
            >
              {isSelected ? 'Đã chọn' : 'Chọn'}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
