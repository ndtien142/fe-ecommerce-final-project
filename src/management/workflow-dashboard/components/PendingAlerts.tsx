import React from 'react';
// @mui
import { Alert, Typography, Box, Chip } from '@mui/material';

// ----------------------------------------------------------------------

interface PendingAlertsProps {
  pendingAlerts?: {
    pendingConfirmation: number;
    pendingPickup: number;
    overdueOrders?: number;
    paymentIssues?: number;
  };
  realtimeData?: {
    activeOrders: number;
    totalUsers: number;
    pendingActions: number;
    systemHealth: {
      status: string;
      responseTime: number;
      uptime: number;
    };
  };
}

export default function PendingAlerts({ pendingAlerts, realtimeData }: PendingAlertsProps) {
  if (!pendingAlerts && !realtimeData) return null;

  const hasUrgentAlerts =
    (pendingAlerts?.pendingConfirmation || 0) > 0 ||
    (pendingAlerts?.pendingPickup || 0) > 0 ||
    (pendingAlerts?.overdueOrders || 0) > 0 ||
    (pendingAlerts?.paymentIssues || 0) > 0;

  return (
    <Box sx={{ mb: 3 }}>
      {hasUrgentAlerts && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">
            Cần xử lý: {pendingAlerts?.pendingConfirmation || 0} đơn chờ xác nhận,{' '}
            {pendingAlerts?.pendingPickup || 0} đơn chờ lấy hàng
            {(pendingAlerts?.overdueOrders || 0) > 0 && (
              <>, {pendingAlerts?.overdueOrders} đơn quá hạn</>
            )}
            {(pendingAlerts?.paymentIssues || 0) > 0 && (
              <>, {pendingAlerts?.paymentIssues} lỗi thanh toán</>
            )}
          </Typography>
        </Alert>
      )}

      {realtimeData && (
        <Alert
          severity={realtimeData.systemHealth.status === 'healthy' ? 'success' : 'error'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2">
              Trạng thái:{' '}
              {realtimeData.systemHealth.status === 'healthy' ? 'Hoạt động tốt' : 'Có vấn đề'}
            </Typography>
            <Chip
              label={`${realtimeData.activeOrders} đơn hàng hoạt động`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`${realtimeData.totalUsers} người dùng hoạt động`}
              size="small"
              color="secondary"
              variant="outlined"
            />
            <Chip
              label={`${realtimeData.pendingActions} hành động chờ`}
              size="small"
              color="warning"
              variant="outlined"
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Thời gian phản hồi: {realtimeData.systemHealth.responseTime}ms | Uptime:{' '}
              {realtimeData.systemHealth.uptime}%
            </Typography>
          </Box>
        </Alert>
      )}
    </Box>
  );
}
