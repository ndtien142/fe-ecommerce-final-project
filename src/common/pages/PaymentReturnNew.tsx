import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, CircularProgress, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import { checkMoMoPaymentStatus } from '../../checkout/service';
import { PATH_CUSTOMER } from '../routes/paths';
import { OrderUtils } from '../utils/orderUtils';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const ContentStyle = styled(Paper)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6, 4),
  textAlign: 'center',
}));

// ----------------------------------------------------------------------

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'success' | 'failed' | 'error'>(
    'checking'
  );
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const orderId = searchParams.get('orderId');
  const resultCode = searchParams.get('resultCode');
  const message = searchParams.get('message');

  useEffect(() => {
    const checkPaymentResult = async () => {
      try {
        // Get pending order from localStorage
        const pendingOrder = OrderUtils.getPendingOrder();
        if (pendingOrder) {
          setOrderInfo(pendingOrder);
        }

        if (resultCode === '0') {
          // Payment successful
          setPaymentStatus('success');

          // Clear cart and pending order
          OrderUtils.clearPendingOrder();
          OrderUtils.clearCart();

          // Optionally check payment status from server
          if (orderId) {
            try {
              const response = await checkMoMoPaymentStatus(orderId);
              console.log('Payment status from server:', response);
            } catch (error) {
              console.error('Error checking payment status:', error);
            }
          }
        } else {
          // Payment failed
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Error checking payment result:', error);
        setPaymentStatus('error');
      }
    };

    checkPaymentResult();
  }, [orderId, resultCode]);

  const handleGoToOrders = () => {
    navigate('/order');
  };

  const handleContinueShopping = () => {
    navigate(PATH_CUSTOMER.home);
  };

  const handleRetryPayment = () => {
    navigate('/checkout');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const renderPaymentResult = () => {
    switch (paymentStatus) {
      case 'checking':
        return (
          <Stack spacing={3} alignItems="center">
            <CircularProgress size={64} />
            <Typography variant="h4">Đang kiểm tra kết quả thanh toán...</Typography>
            <Typography variant="body1" color="text.secondary">
              Vui lòng đợi trong giây lát
            </Typography>
          </Stack>
        );

      case 'success':
        return (
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="eva:checkmark-fill" sx={{ width: 48, height: 48, color: 'white' }} />
            </Box>
            <Typography variant="h3" color="success.main">
              Thanh toán thành công!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Đơn hàng #{orderId} đã được thanh toán thành công.
            </Typography>
            {orderInfo && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Số tiền: {OrderUtils.formatCurrency(parseInt(orderInfo.amount))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phương thức: MoMo
                </Typography>
              </Box>
            )}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" onClick={handleGoToOrders}>
                Xem đơn hàng
              </Button>
              <Button variant="outlined" onClick={handleContinueShopping}>
                Tiếp tục mua sắm
              </Button>
            </Stack>
          </Stack>
        );

      case 'failed':
        return (
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'error.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="eva:close-fill" sx={{ width: 48, height: 48, color: 'white' }} />
            </Box>
            <Typography variant="h3" color="error.main">
              Thanh toán thất bại
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Rất tiếc, thanh toán của bạn không thành công.
            </Typography>
            <Typography variant="body2" color="error.main">
              Lý do: {OrderUtils.getPaymentStatusMessage(resultCode || '')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" onClick={handleRetryPayment}>
                Thử lại
              </Button>
              <Button variant="outlined" onClick={handleBackToCart}>
                Quay lại giỏ hàng
              </Button>
            </Stack>
          </Stack>
        );

      default:
        return (
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'warning.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon="eva:alert-triangle-fill"
                sx={{ width: 48, height: 48, color: 'white' }}
              />
            </Box>
            <Typography variant="h3" color="warning.main">
              Có lỗi xảy ra
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Không thể xác định kết quả thanh toán.
            </Typography>
            <Button variant="contained" onClick={handleGoToOrders}>
              Kiểm tra đơn hàng
            </Button>
          </Stack>
        );
    }
  };

  return (
    <Page title="Kết quả thanh toán">
      <RootStyle>
        <Container>
          <ContentStyle>{renderPaymentResult()}</ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
