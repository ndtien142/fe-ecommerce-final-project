import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Link,
  MenuItem,
  Tooltip,
} from '@mui/material';
// utils
import { fDate } from '../../../common/utils/formatTime';
import { fCurrency } from '../../../common/utils/formatNumber';
// @types
import { IOrder } from '../../../common/@types/order/order.interface';
// components
import Label from '../../../common/components/Label';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';

// ----------------------------------------------------------------------

type Props = {
  row: IOrder;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  // Extract order info
  const {
    id,
    address,
    orderedDate,
    totalAmount,
    status,
    shippingMethod,
    payment,
    note,
    lineItems,
  } = row;

  const customerName = address?.receiverName || 'Khách hàng';
  const customerPhone = address?.phoneNumber || '';
  const shippingMethodName = shippingMethod?.name || '';
  const paymentMethodName = payment?.paymentMethod?.name || '';
  const productNames = lineItems?.map((item) => item.product?.name).join(', ');

  // Status color mapping
  const statusColor =
    (status === 'pending_confirmation' && 'warning') ||
    (status === 'pending_pickup' && 'primary') ||
    (status === 'shipping' && 'info') ||
    (status === 'delivered' && 'success') ||
    (status === 'returned' && 'default') ||
    (status === 'cancelled' && 'error') ||
    'default';

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Link
          noWrap
          variant="body2"
          onClick={onViewRow}
          sx={{ color: 'text.primary', cursor: 'pointer', fontWeight: 600 }}
        >
          #{id}
        </Link>
      </TableCell>

      <TableCell>
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" noWrap>
            {customerName}
          </Typography>
          {customerPhone && (
            <Typography variant="caption" color="text.secondary" noWrap>
              {customerPhone}
            </Typography>
          )}
        </Stack>
      </TableCell>

      <TableCell align="left">
        <Stack spacing={0.5}>
          <Typography variant="body2">{fDate(orderedDate)}</Typography>
          {note && (
            <Tooltip title={note}>
              <Typography variant="caption" color="text.secondary" noWrap>
                <Iconify icon="eva:info-outline" fontSize={16} sx={{ mr: 0.5 }} />
                {note.length > 20 ? note.slice(0, 20) + '...' : note}
              </Typography>
            </Tooltip>
          )}
        </Stack>
      </TableCell>

      <TableCell align="center">
        <Stack spacing={0.5}>
          <Typography variant="subtitle2">{fCurrency(totalAmount)}</Typography>
          {productNames && (
            <Tooltip title={productNames}>
              <Typography variant="caption" color="text.secondary" noWrap>
                <Iconify icon="eva:shopping-bag-outline" fontSize={16} sx={{ mr: 0.5 }} />
                {productNames.length > 20 ? productNames.slice(0, 20) + '...' : productNames}
              </Typography>
            </Tooltip>
          )}
        </Stack>
      </TableCell>

      <TableCell align="left">
        <Stack spacing={0.5}>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={statusColor}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
          {shippingMethodName && (
            <Typography variant="caption" color="text.secondary" noWrap>
              <Iconify icon="eva:car-outline" fontSize={16} sx={{ mr: 0.5 }} />
              {shippingMethodName}
            </Typography>
          )}
          {paymentMethodName && (
            <Typography variant="caption" color="text.secondary" noWrap>
              <Iconify icon="eva:credit-card-outline" fontSize={16} sx={{ mr: 0.5 }} />
              {paymentMethodName}
            </Typography>
          )}
        </Stack>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                Xem
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
