import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  DialogTitle,
  DialogContent,
  Typography,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
// hooks
import useToggle from '../../../common/hooks/useToggle';
import { useUpdateOrderStatus } from '../../hooks/useUpdateOrderStatus';
import { useCancelOrderAdmin } from '../../hooks/useCancelOrderAdmin';
import { useProcessOrderRefund } from '../../hooks/useProcessOrderRefund';
import useMessage from '../../../common/hooks/useMessage';
// components
import Iconify from '../../../common/components/Iconify';
import OrderPDF from './OrderPDF';
// utils
import { OrderUtils } from '../../../common/utils/orderUtils';
// @types
import { IOrder, OrderStatus } from '../../../common/@types/order/order.interface';

// ----------------------------------------------------------------------

type Props = {
  order: IOrder;
};

export default function OrderToolbar({ order }: Props) {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  // Hooks for admin actions
  const updateStatusMutation = useUpdateOrderStatus();
  const cancelOrderAdminMutation = useCancelOrderAdmin();
  const processRefundMutation = useProcessOrderRefund();

  const { toggle: open, onOpen, onClose } = useToggle();
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status as OrderStatus);

  const handleEdit = () => {
    navigate(`/order/edit/${order.id}`);
  };

  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateStatusMutation.mutateAsync({
        orderId: order.id,
        status: selectedStatus,
      });
      showSuccessSnackbar('Cập nhật trạng thái thành công!');
      setStatusDialogOpen(false);
    } catch (error: any) {
      showErrorSnackbar(
        error?.response?.data?.message || error?.message || 'Không thể cập nhật trạng thái'
      );
    }
  };

  const handleCancelOrderAdmin = async () => {
    try {
      await cancelOrderAdminMutation.mutateAsync(order.id);
      showSuccessSnackbar('Hủy đơn hàng thành công!');
      setCancelDialogOpen(false);
    } catch (error: any) {
      showErrorSnackbar(
        error?.response?.data?.message || error?.message || 'Không thể hủy đơn hàng'
      );
    }
  };

  const handleProcessRefund = async () => {
    try {
      await processRefundMutation.mutateAsync({
        orderId: order.id,
        amount: Number(order.totalAmount),
      });
      showSuccessSnackbar('Xử lý hoàn tiền thành công!');
      setRefundDialogOpen(false);
    } catch (error: any) {
      showErrorSnackbar(
        error?.response?.data?.message || error?.message || 'Không thể xử lý hoàn tiền'
      );
    }
  };

  const availableStatuses: OrderStatus[] = [
    'pending_confirmation',
    'pending_pickup',
    'shipping',
    'delivered',
    'returned',
    'cancelled',
  ];
  const canUpdateStatus = order.status !== 'cancelled' && order.status !== 'delivered';
  const canCancelOrder = OrderUtils.canCancelOrder(order.status);
  const canProcessRefund =
    order.payment?.status === 'completed' && ['delivered', 'returned'].includes(order.status);

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Order">
            <IconButton onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="View PDF">
            <IconButton onClick={onOpen}>
              <Iconify icon={'eva:eye-fill'} />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={<OrderPDF order={order} />}
            fileName={`ORDER-${order.id}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download PDF">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon={'eva:download-fill'} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>

          <Tooltip title="Print">
            <IconButton>
              <Iconify icon={'eva:printer-fill'} />
            </IconButton>
          </Tooltip>

          {canUpdateStatus && (
            <Tooltip title="Update Status">
              <IconButton onClick={() => setStatusDialogOpen(true)}>
                <Iconify icon={'eva:refresh-fill'} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Admin Actions">
            <IconButton onClick={handleActionsMenuOpen}>
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={OrderUtils.getStatusText(order.status)}
            color={OrderUtils.getStatusColor(order.status) as any}
            size="medium"
          />

          {canUpdateStatus && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon={'eva:refresh-fill'} />}
              onClick={() => setStatusDialogOpen(true)}
            >
              Cập nhật trạng thái
            </Button>
          )}

          {order.payment?.status === 'pending' && (
            <Button
              variant="outlined"
              color="warning"
              startIcon={<Iconify icon={'eva:checkmark-circle-fill'} />}
            >
              Xác nhận thanh toán
            </Button>
          )}
        </Stack>
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <OrderPDF order={order} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>

      {/* Admin Actions Menu */}
      <Menu
        anchorEl={actionsMenuAnchor}
        open={Boolean(actionsMenuAnchor)}
        onClose={handleActionsMenuClose}
        PaperProps={{
          sx: { width: 220 },
        }}
      >
        {canUpdateStatus && (
          <MenuItem
            onClick={() => {
              setStatusDialogOpen(true);
              handleActionsMenuClose();
            }}
          >
            <ListItemIcon>
              <Iconify icon={'eva:refresh-fill'} />
            </ListItemIcon>
            <ListItemText primary="Cập nhật trạng thái" />
          </MenuItem>
        )}

        {canCancelOrder && (
          <MenuItem
            onClick={() => {
              setCancelDialogOpen(true);
              handleActionsMenuClose();
            }}
          >
            <ListItemIcon>
              <Iconify icon={'eva:close-circle-fill'} />
            </ListItemIcon>
            <ListItemText primary="Hủy đơn hàng (Admin)" />
          </MenuItem>
        )}

        {canProcessRefund && (
          <MenuItem
            onClick={() => {
              setRefundDialogOpen(true);
              handleActionsMenuClose();
            }}
          >
            <ListItemIcon>
              <Iconify icon={'eva:undo-fill'} />
            </ListItemIcon>
            <ListItemText primary="Xử lý hoàn tiền" />
          </MenuItem>
        )}

        <Divider />

        <MenuItem onClick={handleActionsMenuClose}>
          <ListItemIcon>
            <Iconify icon={'eva:message-circle-fill'} />
          </ListItemIcon>
          <ListItemText primary="Gửi thông báo" />
        </MenuItem>

        <MenuItem onClick={handleActionsMenuClose}>
          <ListItemIcon>
            <Iconify icon={'eva:email-fill'} />
          </ListItemIcon>
          <ListItemText primary="Gửi email khách hàng" />
        </MenuItem>
      </Menu>

      {/* Update Status Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Cập nhật trạng thái cho đơn hàng #{order.id}
          </Alert>

          <FormControl fullWidth margin="normal">
            <InputLabel>Trạng thái mới</InputLabel>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
            >
              {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={OrderUtils.getStatusText(status)}
                      size="small"
                      style={{ backgroundColor: OrderUtils.getStatusColor(status) }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Trạng thái hiện tại:</strong> {OrderUtils.getStatusText(order.status)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setStatusDialogOpen(false)}
            disabled={updateStatusMutation.isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateStatus}
            color="primary"
            variant="contained"
            disabled={updateStatusMutation.isLoading || selectedStatus === order.status}
          >
            {updateStatusMutation.isLoading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                Đang cập nhật...
              </>
            ) : (
              'Cập nhật trạng thái'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Order Admin Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Hủy đơn hàng (Admin)</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Bạn đang hủy đơn hàng với quyền Admin. Hành động này không thể hoàn tác.
          </Alert>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Đơn hàng:</strong> #{order.id}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Khách hàng:</strong> {order.user?.userNickname || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Trạng thái:</strong> {OrderUtils.getStatusText(order.status)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tổng tiền:</strong> {OrderUtils.formatCurrency(Number(order.totalAmount))}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCancelDialogOpen(false)}
            disabled={cancelOrderAdminMutation.isLoading}
          >
            Không
          </Button>
          <Button
            onClick={handleCancelOrderAdmin}
            color="error"
            variant="contained"
            disabled={cancelOrderAdminMutation.isLoading}
          >
            {cancelOrderAdminMutation.isLoading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                Đang hủy...
              </>
            ) : (
              'Hủy đơn hàng'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Process Refund Dialog */}
      <Dialog
        open={refundDialogOpen}
        onClose={() => setRefundDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Xử lý hoàn tiền</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Xử lý hoàn tiền cho đơn hàng #{order.id}
          </Alert>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Số tiền hoàn:</strong> {OrderUtils.formatCurrency(Number(order.totalAmount))}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Phương thức thanh toán:</strong> {order.payment?.paymentMethod?.name || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Thời gian xử lý:</strong> 3-5 ngày làm việc
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setRefundDialogOpen(false)}
            disabled={processRefundMutation.isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleProcessRefund}
            color="success"
            variant="contained"
            disabled={processRefundMutation.isLoading}
          >
            {processRefundMutation.isLoading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                Đang xử lý...
              </>
            ) : (
              'Xử lý hoàn tiền'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
