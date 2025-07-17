import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// @mui
import {
  Box,
  Stack,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
  DialogTitle,
  DialogContent,
  Typography,
  Alert,
  Button,
} from '@mui/material';
// hooks
import useToggle from '../../../common/hooks/useToggle';
// components
import Iconify from '../../../common/components/Iconify';
// utils
// types
import { IOrder } from '../../../common/@types/order/order.interface';
import OrderPDF from '../detail/OrderPDF';

// ----------------------------------------------------------------------

interface Props {
  order: IOrder;
}

export default function OrderWorkflowToolbar({ order }: Props) {
  const navigate = useNavigate();

  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleContactSupport = () => {
    setContactDialogOpen(true);
  };

  // Workflow hooks

  // Dialog states
  const { toggle: open, onOpen, onClose } = useToggle();

  const canViewPDF = true;

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
          <Tooltip title="Contact Support">
            <IconButton onClick={handleContactSupport}>
              <Iconify icon={'eva:message-circle-fill'} />
            </IconButton>
          </Tooltip>
          {canViewPDF && (
            <Tooltip title="Xem PDF">
              <IconButton onClick={onOpen}>
                <Iconify icon={'eva:eye-fill'} />
              </IconButton>
            </Tooltip>
          )}
          <PDFDownloadLink
            document={<OrderPDF order={order} />}
            fileName={`ORDER-${order.id}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Tải PDF">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Iconify icon={'eva:download-fill'} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>
      </Stack>

      {/* PDF Dialog */}
      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Đóng">
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
