import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Stack,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import { EnhancedMoMoService } from '../services/enhancedMoMoService';
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
  maxWidth: 600,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6, 4),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: theme.customShadows.z20,
}));

const StatusIcon = styled(Box)(({ theme }) => ({
  fontSize: '80px',
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// ----------------------------------------------------------------------

export default function EnhancedPaymentReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed' | 'error'>(
    'processing'
  );
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  const orderId = searchParams.get('orderId');
  const resultCode = searchParams.get('resultCode');
  const transId = searchParams.get('transId');
  const amount = searchParams.get('amount');
  const message = searchParams.get('message');

  useEffect(() => {
    const processPaymentReturn = async () => {
      try {
        // Get pending order from localStorage
        const pendingOrder = OrderUtils.getPendingOrder();
        if (pendingOrder) {
          setPaymentInfo(pendingOrder);
        }

        // Set payment info from URL parameters
        setPaymentInfo((prev: any) => ({
          ...prev,
          orderId,
          resultCode,
          transId,
          amount: amount ? parseInt(amount) : null,
          message,
        }));

        if (resultCode === '0') {
          // Payment successful
          setPaymentStatus('success');

          // Clear cart and pending order
          OrderUtils.clearPendingOrder();
          OrderUtils.clearCart();

          // Verify payment status with backend
          if (orderId) {
            try {
              const verification = await EnhancedMoMoService.getPaymentStatus(orderId);
              if (verification.success) {
                console.log('Payment verification successful:', verification.data);
              } else {
                console.error('Payment verification failed:', verification.error);
              }
            } catch (error) {
              console.error('Payment verification error:', error);
            }
          }

          // Auto redirect to success page after 3 seconds
          setTimeout(() => {
            navigate('/order', {
              state: {
                orderId,
                amount,
                transId,
                message: 'Thanh toán thành công!',
              },
            });
          }, 3000);
        } else {
          // Payment failed
          setPaymentStatus('failed');

          // Auto redirect to checkout after 5 seconds
          setTimeout(() => {
            navigate('/checkout', {
              state: {
                error: EnhancedMoMoService.getPaymentStatusMessage(resultCode || ''),
                orderId,
                resultCode,
              },
            });
          }, 5000);
        }
      } catch (error) {
        console.error('Error processing payment return:', error);
        setPaymentStatus('error');

        setTimeout(() => {
          navigate('/checkout');
        }, 5000);
      }
    };

    if (orderId && resultCode) {
      processPaymentReturn();
    } else {
      setPaymentStatus('error');
      setTimeout(() => {
        navigate('/checkout');
      }, 3000);
    }
  }, [orderId, resultCode, transId, amount, message, navigate]);

  const getStatusDisplay = () => {
    switch (paymentStatus) {
      case 'processing':
        return {
          icon: '🔄',
          title: 'Đang xử lý kết quả thanh toán...',
          subtitle: 'Vui lòng chờ trong giây lát',
          color: 'info',
        };
      case 'success':
        return {
          icon: '✅',
          title: 'Thanh toán thành công!',
          subtitle: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ',
          color: 'success',
        };
      case 'failed':
        return {
          icon: '❌',
          title: 'Thanh toán thất bại',
          subtitle: 'Rất tiếc, giao dịch không thành công',
          color: 'error',
        };
      case 'error':
        return {
          icon: '⚠️',
          title: 'Có lỗi xảy ra',
          subtitle: 'Không thể xử lý kết quả thanh toán',
          color: 'error',
        };
      default:
        return {
          icon: '💳',
          title: 'Đang xử lý...',
          subtitle: 'Vui lòng chờ trong giây lát',
          color: 'info',
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  const renderPaymentDetails = () => {
    if (!paymentInfo) return null;

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Chi tiết giao dịch
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2} sx={{ textAlign: 'left' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Mã đơn hàng
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {paymentInfo.orderId}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Mã kết quả
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {paymentInfo.resultCode}
            </Typography>
          </Grid>

          {paymentInfo.amount && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Số tiền
              </Typography>
              <Typography variant="body1" fontWeight="medium" color="primary">
                {OrderUtils.formatCurrency(paymentInfo.amount)}
              </Typography>
            </Grid>
          )}

          {paymentInfo.transId && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Mã giao dịch MoMo
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {paymentInfo.transId}
              </Typography>
            </Grid>
          )}

          {paymentInfo.message && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Thông báo
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {paymentInfo.message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  const renderActionButtons = () => {
    if (paymentStatus === 'processing') return null;

    return (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mt: 4 }}
        justifyContent="center"
      >
        {paymentStatus === 'success' && (
          <>
            <Button
              variant="contained"
              onClick={() => navigate('/order')}
              startIcon={<Iconify icon="eva:list-outline" />}
            >
              Xem đơn hàng
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(PATH_CUSTOMER.home)}
              startIcon={<Iconify icon="eva:home-outline" />}
            >
              Tiếp tục mua sắm
            </Button>
          </>
        )}

        {paymentStatus === 'failed' && (
          <>
            <Button
              variant="contained"
              onClick={() => navigate('/checkout')}
              startIcon={<Iconify icon="eva:refresh-outline" />}
            >
              Thử lại
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/cart')}
              startIcon={<Iconify icon="eva:shopping-cart-outline" />}
            >
              Quay lại giỏ hàng
            </Button>
          </>
        )}

        {paymentStatus === 'error' && (
          <Button
            variant="contained"
            onClick={() => navigate('/checkout')}
            startIcon={<Iconify icon="eva:arrow-back-outline" />}
          >
            Quay lại thanh toán
          </Button>
        )}
      </Stack>
    );
  };

  const renderStatusMessage = () => {
    const messages = {
      processing: 'Đang xử lý kết quả thanh toán từ MoMo...',
      success: 'Đang chuyển hướng đến trang đơn hàng...',
      failed: 'Đang chuyển hướng về trang thanh toán...',
      error: 'Đang chuyển hướng về trang thanh toán...',
    };

    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {messages[paymentStatus]}
      </Typography>
    );
  };

  return (
    <Page title="Kết quả thanh toán">
      <RootStyle>
        <Container>
          <ContentStyle>
            <StatusIcon>{statusDisplay.icon}</StatusIcon>

            <Typography variant="h3" color={`${statusDisplay.color}.main`} gutterBottom>
              {statusDisplay.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {statusDisplay.subtitle}
            </Typography>

            {/* Processing spinner */}
            {paymentStatus === 'processing' && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <CircularProgress size={40} />
              </Box>
            )}

            {/* Status message */}
            {renderStatusMessage()}

            {/* Payment details */}
            {renderPaymentDetails()}

            {/* Action buttons */}
            {renderActionButtons()}

            {/* Additional info */}
            {paymentStatus === 'failed' && paymentInfo?.resultCode && (
              <Alert severity="error" sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="body2">
                  <strong>Lý do thất bại:</strong>{' '}
                  {EnhancedMoMoService.getPaymentStatusMessage(paymentInfo.resultCode)}
                </Typography>
              </Alert>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
