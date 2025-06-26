import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../common/utils/formatTime';
import { fCurrency } from '../../../common/utils/formatNumber';
// @types
import { IOrder } from '../../../common/@types/order/order.interface';
// components
import Label from '../../../common/components/Label';
import Image from '../../../common/components/Image';
import Scrollbar from '../../../common/components/Scrollbar';
import OrderToolbar from './OrderToolbar';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  order?: IOrder;
};

export default function OrderDetailSection({ order }: Props) {
  const theme = useTheme();

  if (!order) {
    return null;
  }

  const {
    id,
    status,
    orderedDate,
    deliveredDate,
    address,
    shippingMethod,
    payment,
    lineItems,
    note,
    totalAmount,
    shippingFee,
    createTime,
  } = order;

  const statusColor =
    (status === 'pending_confirmation' && 'warning') ||
    (status === 'pending_pickup' && 'primary') ||
    (status === 'shipping' && 'info') ||
    (status === 'delivered' && 'success') ||
    (status === 'returned' && 'default') ||
    (status === 'cancelled' && 'error') ||
    'default';

  const subtotal = lineItems.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <>
      <OrderToolbar order={order} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              disabledEffect
              visibleByDefault
              alt="logo"
              src="/logo/logo_full.svg"
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={statusColor}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>
              <Typography variant="h6">{`Đơn hàng #${id}`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Địa chỉ giao hàng
            </Typography>
            <Typography variant="body2">{address?.receiverName}</Typography>
            <Typography variant="body2">
              {address
                ? `${address.streetNumber} ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`
                : ''}
            </Typography>
            <Typography variant="body2">SĐT: {address?.phoneNumber}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Phương thức giao hàng
            </Typography>
            <Typography variant="body2">{shippingMethod?.name}</Typography>
            <Typography variant="body2">{shippingMethod?.code}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Ngày đặt hàng
            </Typography>
            <Typography variant="body2">{fDate(orderedDate)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Ngày giao hàng
            </Typography>
            <Typography variant="body2">{deliveredDate ? fDate(deliveredDate) : '-'}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Phương thức thanh toán
            </Typography>
            <Typography variant="body2">{payment?.paymentMethod?.name || '-'}</Typography>
            <Typography variant="body2">{payment?.paymentMethod?.description || ''}</Typography>
            <Typography variant="body2">
              Số tiền: {payment?.amount ? fCurrency(payment.amount) : '-'}
            </Typography>
            <Typography variant="body2">Trạng thái: {payment?.status}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">Sản phẩm</TableCell>
                  <TableCell align="left">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {lineItems.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 560 }}>
                        {row.product?.thumbnail && (
                          <Image
                            src={row.product.thumbnail ?? ''}
                            alt={row.product?.name}
                            sx={{ width: 48, height: 48, mr: 2, borderRadius: 1 }}
                          />
                        )}
                        <Typography variant="subtitle2">{row.product?.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="right">{fCurrency(row.price)}</TableCell>
                    <TableCell align="right">{fCurrency(row.total)}</TableCell>
                  </TableRow>
                ))}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>Tạm tính</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{fCurrency(subtotal)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>Phí vận chuyển</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{shippingFee ? fCurrency(shippingFee) : 'Miễn phí'}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">Tổng cộng</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{fCurrency(totalAmount)}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">Ghi chú</Typography>
            <Typography variant="body2">{note || 'Không có ghi chú cho đơn hàng này.'}</Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Ngày tạo đơn</Typography>
            <Typography variant="body2">{fDate(createTime)}</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
