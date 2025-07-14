import React, { useState } from 'react';
import {
  Box,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
// hooks
import useMessage from '../../../common/hooks/useMessage';
import { useUpdateOrderStatusActions } from 'src/management-order/hooks/workflow/useUpdateStatus';
// components
import Iconify from '../../../common/components/Iconify';
// types
import { IOrder } from '../../../common/@types/order/order.interface';
import { IActionConfig, IWorkflowActionRequest } from 'src/common/@types/order/workflow.interface';
import { getActionConfig } from 'src/management-order/orderWorkflow.utils';
import { useGetWorkFlowActions } from 'src/management-order/hooks/workflow/useGetWorkFlowActions';

// ----------------------------------------------------------------------

interface Props {
  order: IOrder;
  onStatusUpdate?: () => void;
}

export default function OrderStatusManager({ order, onStatusUpdate }: Props) {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: workflowStatus } = useGetWorkFlowActions(order.id);
  const { executeAction, isLoading } = useUpdateOrderStatusActions(order.id);

  console.log('Workflow Status:', workflowStatus);
  console.log('order:', order);

  const [selectedAction, setSelectedAction] = useState<IActionConfig | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    note: '',
    reason: '',
    trackingNumber: '',
    shippedBy: '',
  });

  // Get available actions from database
  const availableActions = (workflowStatus?.metadata?.availableActions || []).map((action) =>
    getActionConfig(action)
  );

  console.log('Workflow Status:', workflowStatus);
  console.log(
    'Available Actions:',
    availableActions.map((action) => action.title)
  );

  const handleActionSelect = (action: IActionConfig) => {
    setSelectedAction(action);
    setDialogOpen(true);
    setFormData({
      note: '',
      reason: '',
      trackingNumber: '',
      shippedBy: '',
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedAction(null);
    setFormData({
      note: '',
      reason: '',
      trackingNumber: '',
      shippedBy: '',
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExecuteAction = async () => {
    if (!selectedAction) return;

    try {
      const requestData: IWorkflowActionRequest = {
        note: formData.note,
        ...(selectedAction.requiresReason && { reason: formData.reason }),
        ...(selectedAction.requiresTracking && {
          trackingNumber: formData.trackingNumber,
          shippedBy: formData.shippedBy,
        }),
      };

      await executeAction(selectedAction.key, requestData);

      showSuccessSnackbar(`${selectedAction.title} thành công!`);
      handleDialogClose();
      onStatusUpdate?.();
    } catch (error: any) {
      showErrorSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          `Không thể thực hiện ${selectedAction.title.toLowerCase()}`
      );
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { text: string; color: any }> = {
      pending_confirmation: { text: 'Chờ xác nhận', color: 'warning' },
      pending_pickup: { text: 'Chờ lấy hàng', color: 'primary' },
      shipping: { text: 'Đang giao', color: 'info' },
      delivered: { text: 'Đã giao', color: 'success' },
      returned: { text: 'Trả hàng', color: 'default' },
      cancelled: { text: 'Đã hủy', color: 'error' },
    };

    return statusMap[status] || { text: status, color: 'default' };
  };

  const canExecuteActions = !['cancelled', 'returned'].includes(order.status);

  console.log('Available Actions:', availableActions);

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Stack spacing={3}>
        {/* Current Status */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Trạng thái hiện tại
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Chip
              label={getStatusDisplay(order.status).text}
              color={getStatusDisplay(order.status).color}
              size="medium"
            />
            <Typography variant="body2" color="text.secondary">
              Đơn hàng #{order.id}
            </Typography>
          </Stack>
        </Box>

        {/* Available Actions */}
        {canExecuteActions && availableActions.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Hành động có thể thực hiện
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {availableActions.map((action) => (
                <Button
                  key={action.key}
                  variant="outlined"
                  color={action.color}
                  startIcon={<Iconify icon={action.icon} />}
                  onClick={() => handleActionSelect(action)}
                  disabled={isLoading}
                >
                  {action.title}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        {/* No Actions Available */}
        {(!canExecuteActions || availableActions.length === 0) && (
          <Alert severity="info">
            {order.status === 'cancelled'
              ? 'Đơn hàng đã bị hủy, không thể thực hiện thêm hành động nào.'
              : order.status === 'returned'
              ? 'Đơn hàng đã được trả lại, không thể thực hiện thêm hành động nào.'
              : 'Không có hành động nào có thể thực hiện cho trạng thái hiện tại.'}
          </Alert>
        )}
      </Stack>

      {/* Action Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={selectedAction?.icon || ''} />
            <Typography variant="h6">{selectedAction?.title}</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          {selectedAction?.description && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {selectedAction.description}
            </Alert>
          )}

          <Stack spacing={2}>
            {/* Next Status Preview */}
            {selectedAction?.nextStatus && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Trạng thái sau khi thực hiện:
                </Typography>
                <Chip
                  label={getStatusDisplay(selectedAction.nextStatus).text}
                  color={getStatusDisplay(selectedAction.nextStatus).color}
                  size="small"
                />
              </Box>
            )}

            {/* Tracking Information */}
            {selectedAction?.requiresTracking && (
              <>
                <TextField
                  label="Mã vận đơn"
                  value={formData.trackingNumber}
                  onChange={(e) => handleFormChange('trackingNumber', e.target.value)}
                  fullWidth
                  required
                  helperText="Nhập mã vận đơn để theo dõi"
                />
                <TextField
                  label="Người giao hàng"
                  value={formData.shippedBy}
                  onChange={(e) => handleFormChange('shippedBy', e.target.value)}
                  fullWidth
                  helperText="Tên người giao hàng hoặc đơn vị vận chuyển"
                />
              </>
            )}

            {/* Reason */}
            {selectedAction?.requiresReason && (
              <TextField
                label="Lý do"
                value={formData.reason}
                onChange={(e) => handleFormChange('reason', e.target.value)}
                fullWidth
                multiline
                rows={2}
                required
                helperText="Nhập lý do chi tiết"
              />
            )}

            {/* Note */}
            {selectedAction?.requiresNote && (
              <TextField
                label="Ghi chú"
                value={formData.note}
                onChange={(e) => handleFormChange('note', e.target.value)}
                fullWidth
                multiline
                rows={3}
                required
                helperText="Ghi chú chi tiết về hành động này"
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            onClick={handleExecuteAction}
            variant="contained"
            color={selectedAction?.color || 'primary'}
            disabled={
              isLoading ||
              (selectedAction?.requiresNote && !formData.note) ||
              (selectedAction?.requiresReason && !formData.reason) ||
              (selectedAction?.requiresTracking && !formData.trackingNumber)
            }
          >
            {isLoading ? 'Đang xử lý...' : selectedAction?.title}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
