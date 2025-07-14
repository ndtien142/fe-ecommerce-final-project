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
} from '@mui/material';
// hooks
import useToggle from '../../../common/hooks/useToggle';
import { useCancelOrder } from '../../hooks/useCancelOrder';
import useMessage from '../../../common/hooks/useMessage';
// components
import Iconify from '../../../common/components/Iconify';
import OrderPDF from './OrderPDF';
// utils
import { OrderUtils } from '../../../common/utils/orderUtils';
// @types
import { IOrder } from '../../../common/@types/order/order.interface';

// ----------------------------------------------------------------------

type Props = {
  order: IOrder;
};

export default function OrderToolbar({ order }: Props) {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const cancelOrderMutation = useCancelOrder();

  const { toggle: open, onOpen, onClose } = useToggle();
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/order/edit/${order.id}`);
  };

  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrderMutation.mutateAsync(order.id);
      showSuccessSnackbar('Hủy đơn hàng thành công!');
      setCancelDialogOpen(false);
      // Optionally refresh order data
    } catch (error: any) {
      showErrorSnackbar(
        error?.response?.data?.message || error?.message || 'Không thể hủy đơn hàng'
      );
    }
  };

  const handleContactSupport = () => {
    setContactDialogOpen(true);
    handleActionsMenuClose();
  };

  const handleRefundRequest = () => {
    showSuccessSnackbar('Yêu cầu hoàn tiền đã được gửi. Chúng tôi sẽ liên hệ bạn trong 24h.');
    handleActionsMenuClose();
  };

  const handleMarkComplete = () => {
    showSuccessSnackbar('Đã đánh dấu đơn hàng hoàn thành!');
    handleActionsMenuClose();
  };

  const canCancelOrder = OrderUtils.canCancelOrder(order.status);
  const canRefundOrder = OrderUtils.canRefundOrder(order.status, order.payment?.status || '');
  const canMarkComplete = order.status === 'delivered';
  const showOrderActions = canCancelOrder || canRefundOrder || canMarkComplete;

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
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
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
              <Tooltip title="Download">
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

          <Tooltip title="Contact Support">
            <IconButton onClick={handleContactSupport}>
              <Iconify icon={'eva:message-circle-fill'} />
            </IconButton>
          </Tooltip>

          {showOrderActions && (
            <Tooltip title="Order Actions">
              <IconButton onClick={handleActionsMenuOpen}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
            label={OrderUtils.getStatusText(order.status)}
            color={OrderUtils.getStatusColor(order.status) as any}
            size="medium"
          />

          {order.payment?.status === 'pending' && (
            <Button
              color="warning"
              variant="outlined"
              startIcon={<Iconify icon={'eva:clock-fill'} />}
            >
              Chờ thanh toán
            </Button>
          )}

          {order.payment?.status === 'completed' && order.status !== 'delivered' && (
            <Button
              color="success"
              variant="outlined"
              startIcon={<Iconify icon={'eva:checkmark-circle-fill'} />}
            >
              Đã thanh toán
            </Button>
          )}

          {canMarkComplete && (
            <Button
              color="primary"
              variant="contained"
              startIcon={<Iconify icon={'eva:checkmark-fill'} />}
              onClick={handleMarkComplete}
            >
              Xác nhận hoàn thành
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

      {/* Order Actions Menu */}
      <Menu
        anchorEl={actionsMenuAnchor}
        open={Boolean(actionsMenuAnchor)}
        onClose={handleActionsMenuClose}
        PaperProps={{
          sx: { width: 200 },
        }}
      >
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
            <ListItemText primary="Hủy đơn hàng" />
          </MenuItem>
        )}

        {canRefundOrder && (
          <MenuItem onClick={handleRefundRequest}>
            <ListItemIcon>
              <Iconify icon={'eva:undo-fill'} />
            </ListItemIcon>
            <ListItemText primary="Yêu cầu hoàn tiền" />
          </MenuItem>
        )}

        <Divider />

        <MenuItem onClick={handleContactSupport}>
          <ListItemIcon>
            <Iconify icon={'eva:message-circle-fill'} />
          </ListItemIcon>
          <ListItemText primary="Liên hệ hỗ trợ" />
        </MenuItem>
      </Menu>

      {/* Cancel Order Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Bạn có chắc chắn muốn hủy đơn hàng #{order.id}? Hành động này không thể hoàn tác.
          </Alert>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Trạng thái hiện tại:</strong> {OrderUtils.getStatusText(order.status)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tổng tiền:</strong> {OrderUtils.formatCurrency(Number(order.totalAmount))}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCancelDialogOpen(false)}
            disabled={cancelOrderMutation.isLoading}
          >
            Không
          </Button>
          <Button
            onClick={handleCancelOrder}
            color="error"
            variant="contained"
            disabled={cancelOrderMutation.isLoading}
          >
            {cancelOrderMutation.isLoading ? (
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

      {/* Contact Support Dialog */}
      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Liên hệ hỗ trợ</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Bạn cần hỗ trợ cho đơn hàng #{order.id}?
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              📞 <strong>Hotline:</strong> 1900-xxxx
            </Typography>
            <Typography variant="body2" gutterBottom>
              📧 <strong>Email:</strong> support@company.com
            </Typography>
            <Typography variant="body2" gutterBottom>
              💬 <strong>Live Chat:</strong> Có sẵn 24/7
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            Vui lòng cung cấp mã đơn hàng #{order.id} khi liên hệ để được hỗ trợ nhanh chóng.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>Đóng</Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:message-circle-fill'} />}
            onClick={() => {
              window.open('tel:1900xxxx', '_self');
            }}
          >
            Gọi ngay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
