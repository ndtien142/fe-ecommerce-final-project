import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { EnhancedMoMoService } from '../services/enhancedMoMoService';
import { OrderUtils } from '../utils/orderUtils';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const PaymentMethodCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.z8,
  },
  '&.selected': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.lighter,
  },
}));

const QRCodeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: theme.spacing(1),
  '& canvas': {
    padding: theme.spacing(1),
    backgroundColor: 'white',
    borderRadius: theme.spacing(0.5),
  },
}));

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

type PaymentMethod = 'web' | 'app' | 'qr' | 'miniapp';

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('web');
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

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
        couponCodes: order.couponCode ? [order.couponCode] : [],
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
        const {
          payUrl,
          deeplink,
          qrCodeUrl: qrUrl,
          deeplinkMiniApp,
        } = response.data.metadata.momoPayment;

        // Store pending order
        OrderUtils.storePendingOrder({
          orderId: response.data.metadata.order.id,
          amount: response.data.metadata.order.totalAmount,
          paymentMethod: 'momo',
        });

        // Handle different payment methods
        switch (paymentMethod) {
          case 'app':
            if (deeplink) {
              window.location.href = deeplink;
            } else {
              throw new Error('Deeplink không khả dụng');
            }
            break;

          case 'qr':
            if (qrUrl) {
              setQrCodeUrl(qrUrl);
              setShowQRDialog(true);
            } else {
              throw new Error('QR code không khả dụng');
            }
            break;

          case 'miniapp':
            if (deeplinkMiniApp) {
              window.location.href = deeplinkMiniApp;
            } else {
              throw new Error('Mini app deeplink không khả dụng');
            }
            break;

          default: // web
            if (payUrl) {
              window.location.href = payUrl;
            } else {
              throw new Error('URL thanh toán không khả dụng');
            }
        }

        onSuccess?.(response.data);
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

  const renderPaymentMethods = () => (
    <FormControl component="fieldset" sx={{ width: '100%', mb: 2 }}>
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
        Chọn phương thức thanh toán:
      </FormLabel>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
        sx={{ gap: 1 }}
      >
        <PaymentMethodCard className={paymentMethod === 'web' ? 'selected' : ''}>
          <FormControlLabel
            value="web"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="eva:browser-outline" width={24} height={24} />
                <Box>
                  <Typography variant="subtitle2">Thanh toán trên Web</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chuyển hướng đến trang web MoMo
                  </Typography>
                </Box>
              </Box>
            }
            sx={{ width: '100%', m: 0 }}
          />
        </PaymentMethodCard>

        <PaymentMethodCard className={paymentMethod === 'app' ? 'selected' : ''}>
          <FormControlLabel
            value="app"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="eva:smartphone-outline" width={24} height={24} />
                <Box>
                  <Typography variant="subtitle2">Ứng dụng MoMo</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mở trực tiếp ứng dụng MoMo
                  </Typography>
                </Box>
              </Box>
            }
            sx={{ width: '100%', m: 0 }}
          />
        </PaymentMethodCard>

        <PaymentMethodCard className={paymentMethod === 'qr' ? 'selected' : ''}>
          <FormControlLabel
            value="qr"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="eva:qr-code-outline" width={24} height={24} />
                <Box>
                  <Typography variant="subtitle2">Quét mã QR</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sử dụng ứng dụng MoMo để quét mã QR
                  </Typography>
                </Box>
              </Box>
            }
            sx={{ width: '100%', m: 0 }}
          />
        </PaymentMethodCard>
      </RadioGroup>
    </FormControl>
  );

  const renderQRDialog = () => (
    <Dialog open={showQRDialog} onClose={() => setShowQRDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Iconify icon="eva:qr-code-outline" width={24} height={24} />
          Quét mã QR để thanh toán
        </Box>
      </DialogTitle>
      <DialogContent>
        <QRCodeContainer>
          <QRCode value={qrCodeUrl} size={200} level="M" includeMargin />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Mở ứng dụng MoMo và quét mã QR để thanh toán
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            Số tiền: {OrderUtils.formatCurrency(order.total)}
          </Typography>
        </QRCodeContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowQRDialog(false)} variant="outlined">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box className={className}>
      {/* Payment Method Selection */}
      {renderPaymentMethods()}

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

      {/* QR Code Dialog */}
      {renderQRDialog()}
    </Box>
  );
}
