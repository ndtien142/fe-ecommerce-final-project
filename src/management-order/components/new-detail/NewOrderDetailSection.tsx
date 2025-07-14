import { useState } from 'react';
import { useQueryClient } from 'react-query';
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
  Tab,
  Tabs,
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
import OrderStatusManager from './OrderStatusManager';
// constants
import { QUERY_KEYS } from '../../../common/constant/queryKeys.constant';
import OrderTimeline from './OrderTimeline';
import OrderWorkflowToolbar from './OrderWorkflowToolbar';

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

export default function NewOrderDetailSection({ order }: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState(0);

  if (!order) {
    return null;
  }

  const {
    id,
    status,
    orderedDate,
    deliveredDate,
    // customerConfirmedDate, // Removed because it does not exist on IOrder
    address,
    shippingMethod,
    payment,
    lineItems,
    note,
    totalAmount,
    shippingFee,
    trackingNumber,
    shippedBy,
  } = order;

  const handleStatusUpdate = () => {
    // Invalidate related queries to refetch data
    queryClient.invalidateQueries([QUERY_KEYS.ORDER, id]);
    queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, id]);
    queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, id]);
    queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
    queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
  };

  const statusColor =
    (status === 'pending_confirmation' && 'warning') ||
    (status === 'pending_pickup' && 'primary') ||
    (status === 'shipping' && 'info') ||
    (status === 'delivered' && 'success') ||
    (status === 'returned' && 'default') ||
    (status === 'cancelled' && 'error') ||
    'default';

  const subtotal = lineItems.reduce((sum, item) => sum + Number(item.total), 0);

  const TABS = [
    { label: 'Thông tin đơn hàng', value: 0 },
    { label: 'Quản lý trạng thái', value: 1 },
    { label: 'Lịch sử xử lý', value: 2 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  console.log('payment', payment);

  return (
    <>
      <OrderWorkflowToolbar order={order} />

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 0 && (
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
              {trackingNumber && (
                <Typography variant="body2">
                  <strong>Mã vận đơn:</strong> {trackingNumber}
                </Typography>
              )}
              {shippedBy && (
                <Typography variant="body2">
                  <strong>Người giao:</strong> {shippedBy}
                </Typography>
              )}
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
                Ngày khách xác nhận
              </Typography>
              {/* <Typography variant="body2">
                {customerConfirmedDate ? fDate(customerConfirmedDate) : '-'}
              </Typography> */}
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Phương thức thanh toán
              </Typography>
              <Typography variant="body2">{payment?.paymentMethod || '-'}</Typography>
              <Typography variant="body2">
                Số tiền: {payment?.amount ? fCurrency(payment.amount) : '-'}
              </Typography>
              {payment?.paidAt && (
                <Typography variant="body2">Ngày thanh toán: {fDate(payment.paidAt)}</Typography>
              )}
              {payment?.transactionCode && (
                <Typography variant="body2">Mã giao dịch: {payment.transactionCode}</Typography>
              )}
              <Label
                color={
                  payment?.status === 'completed'
                    ? 'success'
                    : payment?.status === 'pending'
                    ? 'warning'
                    : payment?.status === 'failed'
                    ? 'error'
                    : 'default'
                }
                sx={{ textTransform: 'capitalize', mt: 1 }}
              >
                {payment?.status || 'Không xác định'}
              </Label>
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
                      <Typography variant="body1">Tạm tính</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{fCurrency(subtotal)}</Typography>
                    </TableCell>
                  </RowResultStyle>

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Phí vận chuyển</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">{fCurrency(shippingFee)}</Typography>
                    </TableCell>
                  </RowResultStyle>

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Tổng cộng</Typography>
                    </TableCell>
                    <TableCell align="right">
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
              <Typography variant="subtitle2">GHI CHÚ</Typography>
              <Typography variant="body2">{note || 'Không có ghi chú'}</Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3 }}>
              <Typography variant="subtitle2">CÓ THẮC MẮC?</Typography>
              <Typography variant="body2">support@example.com</Typography>
            </Grid>
          </Grid>
        </Card>
      )}

      {currentTab === 1 && <OrderStatusManager order={order} onStatusUpdate={handleStatusUpdate} />}

      {currentTab === 2 && <OrderTimeline orderId={order.id} />}
    </>
  );
}
