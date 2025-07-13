import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Alert, Paper, Button, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EnhancedMoMoService } from '../services/enhancedMoMoService';
import { OrderUtils } from '../utils/orderUtils';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const StatusCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  border: `2px solid ${theme.palette.divider}`,
  transition: 'all 0.3s',
}));

const StatusIcon = styled(Box)(({ theme }) => ({
  fontSize: '64px',
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CountdownBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.warning.lighter,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.warning.main}`,
}));

// ----------------------------------------------------------------------

interface PaymentStatusProps {
  orderId: string;
  onStatusChange?: (status: string) => void;
  onComplete?: () => void;
  onFailed?: () => void;
  onExpired?: () => void;
}

type PaymentStatus = 'checking' | 'pending' | 'completed' | 'failed' | 'expired' | 'error';

export default function PaymentStatus({
  orderId,
  onStatusChange,
  onComplete,
  onFailed,
  onExpired,
}: PaymentStatusProps) {
  const [status, setStatus] = useState<PaymentStatus>('checking');
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!orderId) return;

    let interval: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    const checkPaymentStatus = async () => {
      try {
        // Get payment status
        const statusResponse = await EnhancedMoMoService.getPaymentStatus(orderId);

        if (statusResponse.success && statusResponse.data?.metadata) {
          setPaymentInfo(statusResponse.data.metadata);

          // Get expiration info
          const expirationResponse = await EnhancedMoMoService.getPaymentExpiration(orderId);

          if (expirationResponse.success && expirationResponse.data?.metadata?.found) {
            const {
              isExpired,
              timeLeft: remaining,
              status: currentStatus,
            } = expirationResponse.data.metadata;

            if (isExpired) {
              setStatus('expired');
              setTimeLeft(0);
              onExpired?.();
            } else if (currentStatus === 'completed') {
              setStatus('completed');
              setTimeLeft(0);
              onComplete?.();
            } else if (currentStatus === 'failed') {
              setStatus('failed');
              setTimeLeft(0);
              onFailed?.();
            } else {
              setStatus('pending');
              setTimeLeft(remaining);
            }
          } else {
            // Fallback to basic status check
            const resultCode = statusResponse.data.metadata.resultCode;
            if (resultCode === '0') {
              setStatus('completed');
              onComplete?.();
            } else if (resultCode && resultCode !== '8000') {
              setStatus('failed');
              onFailed?.();
            } else {
              setStatus('pending');
            }
          }
        } else {
          throw new Error(statusResponse.error || 'Không thể kiểm tra trạng thái thanh toán');
        }

        setRetryCount(0);
        onStatusChange?.(status);
      } catch (error: any) {
        console.error('Error checking payment status:', error);
        setError(error.message || 'Lỗi khi kiểm tra trạng thái thanh toán');
        setRetryCount((prev) => prev + 1);

        if (retryCount >= 3) {
          setStatus('error');
        }
      }
    };

    // Check immediately
    checkPaymentStatus();

    // Set up interval to check every 5 seconds
    interval = setInterval(checkPaymentStatus, 5000);

    // Set up countdown timer
    if (timeLeft > 0) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setStatus('expired');
            onExpired?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [orderId, onStatusChange, onComplete, onFailed, onExpired, retryCount, timeLeft]);

  const getStatusConfig = () => {
    switch (status) {
      case 'checking':
        return {
          icon: '🔍',
          title: 'Đang kiểm tra trạng thái thanh toán...',
          color: 'info',
          description: 'Vui lòng chờ trong giây lát',
        };
      case 'pending':
        return {
          icon: '⏳',
          title: 'Đang chờ thanh toán',
          color: 'warning',
          description: `Thời gian còn lại: ${EnhancedMoMoService.formatTimeLeft(timeLeft)}`,
        };
      case 'completed':
        return {
          icon: '✅',
          title: 'Thanh toán thành công!',
          color: 'success',
          description: 'Giao dịch đã được hoàn tất',
        };
      case 'failed':
        return {
          icon: '❌',
          title: 'Thanh toán thất bại',
          color: 'error',
          description: 'Vui lòng thử lại hoặc chọn phương thức thanh toán khác',
        };
      case 'expired':
        return {
          icon: '⏰',
          title: 'Thanh toán đã hết hạn',
          color: 'error',
          description: 'Vui lòng tạo thanh toán mới',
        };
      case 'error':
        return {
          icon: '⚠️',
          title: 'Có lỗi xảy ra',
          color: 'error',
          description: error || 'Không thể kiểm tra trạng thái thanh toán',
        };
      default:
        return {
          icon: '💳',
          title: 'Trạng thái không xác định',
          color: 'default',
          description: 'Vui lòng kiểm tra lại',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const renderPaymentInfo = () => {
    if (!paymentInfo) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin giao dịch
        </Typography>
        <Grid container spacing={2}>
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
              Số tiền
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {OrderUtils.formatCurrency(paymentInfo.amount)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Trạng thái
            </Typography>
            <Chip
              label={paymentInfo.status || 'Đang xử lý'}
              color={status === 'completed' ? 'success' : status === 'failed' ? 'error' : 'warning'}
              size="small"
            />
          </Grid>
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
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <StatusCard
        sx={{
          borderColor: `${statusConfig.color}.main`,
          backgroundColor: `${statusConfig.color}.lighter`,
        }}
      >
        <StatusIcon>{statusConfig.icon}</StatusIcon>

        <Typography variant="h4" color={`${statusConfig.color}.main`} gutterBottom>
          {statusConfig.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {statusConfig.description}
        </Typography>

        {/* Countdown Timer */}
        {status === 'pending' && timeLeft > 0 && (
          <CountdownBox>
            <Iconify icon="eva:clock-outline" width={20} height={20} />
            <Typography variant="body2" fontWeight="medium">
              {EnhancedMoMoService.formatTimeLeft(timeLeft)}
            </Typography>
          </CountdownBox>
        )}

        {/* Loading Progress */}
        {status === 'checking' && <LinearProgress sx={{ mt: 2, borderRadius: 1 }} />}

        {/* Error Retry Button */}
        {status === 'error' && (
          <Button
            variant="outlined"
            onClick={() => {
              setStatus('checking');
              setRetryCount(0);
              setError(null);
            }}
            sx={{ mt: 2 }}
          >
            Thử lại
          </Button>
        )}

        {/* Payment Info */}
        {renderPaymentInfo()}
      </StatusCard>

      {/* Help Text */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Lưu ý:</strong> Trang này sẽ tự động cập nhật trạng thái thanh toán. Vui lòng
          không đóng trình duyệt trong quá trình thanh toán.
        </Typography>
      </Alert>
    </Box>
  );
}
