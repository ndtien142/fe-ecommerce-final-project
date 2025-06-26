import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
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
} from '@mui/material';
// hooks
import useToggle from '../../../common/hooks/useToggle';
// components
import Iconify from '../../../common/components/Iconify';
import OrderPDF from './OrderPDF';
// @types
import { IOrder } from '../../../common/@types/order/order.interface';

// ----------------------------------------------------------------------

type Props = {
  order: IOrder;
};

export default function OrderToolbar({ order }: Props) {
  const navigate = useNavigate();

  const { toggle: open, onOpen, onClose } = useToggle();

  const handleEdit = () => {
    navigate(`/order/edit/${order.id}`);
  };

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

          <Tooltip title="Send">
            <IconButton>
              <Iconify icon={'ic:round-send'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify icon={'eva:share-fill'} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'eva:checkmark-fill'} />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Đánh dấu đã thanh toán
        </Button>
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
    </>
  );
}
