import React from 'react';
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

  // Workflow hooks

  // Dialog states
  const { toggle: open, onOpen, onClose } = useToggle();

  const handleEdit = () => {
    navigate(`/order/edit/${order.id}`);
  };

  const canViewPDF = true;
  const canEdit = order.status === 'pending_confirmation' || order.status === 'pending_pickup';

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
          {canEdit && (
            <Tooltip title="Chỉnh sửa đơn hàng">
              <IconButton onClick={handleEdit}>
                <Iconify icon={'eva:edit-fill'} />
              </IconButton>
            </Tooltip>
          )}

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
    </>
  );
}
