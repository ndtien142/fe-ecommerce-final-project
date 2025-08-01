import React from 'react';
// @mui
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Avatar,
  Stack,
  Box,
  CardProps,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
// utils
import { fDateTime } from '../../../common/utils/formatTime';
import { fCurrency } from '../../../common/utils/formatNumber';
// components
import Iconify from '../../../common/components/Iconify';
import Scrollbar from '../../../common/components/Scrollbar';

// ----------------------------------------------------------------------

interface Order {
  id: string;
  total_amount: number;
  status: string;
  create_time: string | Date;
  user?: {
    id: string;
    user_nickname: string;
    user_email: string;
  };
  payments?: Array<{
    payment_method: string;
    status: string;
    amount: number;
  }>;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  orders: Order[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (limit: number) => void;
  onViewOrder?: (orderId: string) => void;
}

const getStatusColor = (status: string) => {
  const statusColors = {
    pending_confirmation: 'warning',
    pending_pickup: 'info',
    shipping: 'primary',
    delivered: 'success',
    customer_confirmed: 'success',
    returned: 'error',
    cancelled: 'error',
  };
  return statusColors[status as keyof typeof statusColors] || 'default';
};

const getStatusText = (status: string) => {
  const statusTexts = {
    pending_confirmation: 'Chờ xác nhận',
    pending_pickup: 'Chờ lấy hàng',
    shipping: 'Đang giao',
    delivered: 'Đã giao',
    customer_confirmed: 'Đã xác nhận',
    returned: 'Đã trả hàng',
    cancelled: 'Đã hủy',
  };
  return statusTexts[status as keyof typeof statusTexts] || status;
};

const getPaymentMethodIcon = (method: string) => {
  const icons = {
    momo: 'logos:momo',
    cod: 'solar:cash-out-bold',
    cash: 'solar:wallet-money-bold',
  };
  return icons[method as keyof typeof icons] || 'solar:card-bold';
};

export default function RecentOrdersList({
  title = 'Đơn hàng gần đây',
  subheader,
  orders,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onViewOrder,
  ...other
}: Props) {
  const handleViewOrder = (orderId: string) => {
    if (onViewOrder) {
      onViewOrder(orderId);
    } else {
      // Default action - you can customize this
      console.log('View order:', orderId);
      // Example: window.open(`/order/${orderId}`, '_blank');
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage + 1); // Convert to 1-based page
    }
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newLimit);
    }
  };
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent sx={{ p: 0 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Đơn hàng</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Thanh toán</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                            width: 40,
                            height: 40,
                          }}
                        >
                          <Iconify icon="solar:bag-bold" width={20} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">#{order.id}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Đơn hàng
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">
                          {order.user?.user_nickname || 'Khách hàng'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.user?.user_email || ''}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" color="success.main">
                        {fCurrency(order.total_amount)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {order.payments && order.payments.length > 0 ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify
                            icon={getPaymentMethodIcon(order.payments[0].payment_method)}
                            width={20}
                          />
                          <Typography variant="caption">
                            {order.payments[0].payment_method.toUpperCase()}
                          </Typography>
                        </Stack>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Chưa thanh toán
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={getStatusText(order.status)}
                        color={getStatusColor(order.status) as any}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {fDateTime(order.create_time)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          size="small"
                          onClick={() => handleViewOrder(order.id)}
                          color="primary"
                        >
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {pagination && (
          <TablePagination
            component="div"
            count={pagination.total}
            page={pagination.page - 1} // Convert to 0-based for MUI
            onPageChange={handlePageChange}
            rowsPerPage={pagination.limit}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Số dòng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
