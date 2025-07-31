import { useState } from 'react';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { EnhancedMoMoService } from '../services/enhancedMoMoService';
import { OrderUtils } from '../utils/orderUtils';
import Iconify from './Iconify';
import { useSelector } from '../redux/store';
// ----------------------------------------------------------------------

interface EnhancedPaymentButtonProps {
  order: {
    id: string;
    total: number;
    items: any[];
    deliveryInfo?: any;
    referenceId?: string;
    couponCode?: string;
  };
  customer?: {
    name: string;
    phone: string;
    email: string;
  };
  cart: any;
  addressId: number;
  paymentMethodId: number;
  shippingMethodId: number;
  note?: string;
  shippingFee?: number;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

export default function EnhancedPaymentButton({
  order,
  customer,
  cart,
  addressId,
  paymentMethodId,
  shippingMethodId,
  note = '',
  shippingFee = 0,
  onSuccess,
  onError,
  className = '',
}: EnhancedPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { appliedCoupon } = useSelector((state) => state.checkout);

  const couponCode = appliedCoupon?.metadata?.coupon?.code
    ? String(appliedCoupon.metadata.coupon.code)
    : '';

  const handlePayment = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Format items for MoMo
      const formattedItems = EnhancedMoMoService.formatPaymentItems(order.items);

      // Format delivery info
      const deliveryInfo = order.deliveryInfo
        ? EnhancedMoMoService.formatDeliveryInfo(order.deliveryInfo)
        : undefined;

      // Format user info
      const userInfo = customer ? EnhancedMoMoService.formatUserInfo(customer) : undefined;

      // Prepare payment data
      const paymentData = {
        internalOrderId: order.id,
        amount: order.total,
        couponCode,
        orderInfo: EnhancedMoMoService.generateOrderInfo(order.id, customer?.name),
        items: formattedItems,
        deliveryInfo,
        userInfo,
        referenceId: order.referenceId || `REF_${order.id}`,
        storeName: 'Your Store Name',
        cart,
        addressId,
        paymentMethodId,
        shippingMethodId,
        note,
        shippingFee,
      };

      const response = await EnhancedMoMoService.createPayment(paymentData);

      if (response.success && response.data?.metadata) {
        const { payUrl } = response.data.metadata.momoPayment;

        // Store pending order
        OrderUtils.storePendingOrder({
          orderId: response.data.metadata.order.id,
          amount: response.data.metadata.order.totalAmount,
          paymentMethod: 'momo',
        });

        if (payUrl) {
          // Không redirect, chỉ trả về payUrl qua callback
          onSuccess?.({ ...response.data, payUrl });
        } else {
          throw new Error('Không có phương thức thanh toán web khả dụng');
        }
      } else {
        throw new Error(response.error || 'Tạo thanh toán thất bại');
      }
    } catch (error: any) {
      console.error('Payment creation failed:', error);
      const errorMessage = error.message || 'Có lỗi xảy ra khi tạo thanh toán';
      setError(errorMessage);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={className}>
      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Payment Button */}
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handlePayment}
        disabled={loading}
        sx={{
          backgroundColor: loading ? 'grey.400' : '#d63384',
          '&:hover': {
            backgroundColor: loading ? 'grey.400' : '#b02a5b',
          },
          py: 1.5,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            <Typography>Đang tạo thanh toán...</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="eva:credit-card-outline" width={24} height={24} />
            <Typography variant="subtitle1" fontWeight="bold">
              Thanh toán với MoMo
            </Typography>
          </Box>
        )}
      </Button>
    </Box>
  );
}
