// @mui
import { Box, Card, Button, Typography, Stack, Paper, CircularProgress } from '@mui/material';
// hooks
import { useGetListAddress } from '../../checkout/hooks/useGetListAddress';
// components
import Iconify from 'src/common/components/Iconify';

// ----------------------------------------------------------------------

export default function AccountBillingAddressBook() {
  const { data, isLoading, error } = useGetListAddress();

  if (isLoading) {
    return (
      <Card sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography color="error">Lỗi khi tải danh sách địa chỉ</Typography>
      </Card>
    );
  }

  const addresses = data?.metadata || [];

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Thông tin thanh toán
        </Typography>

        {addresses.map((address) => (
          <Paper
            key={address.id}
            sx={{
              p: 3,
              width: 1,
              bgcolor: 'background.neutral',
              ...(address.isDefault && {
                border: '2px solid',
                borderColor: 'primary.main',
              }),
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="subtitle1">{address.title}</Typography>
              {address.isDefault && (
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  (Mặc định)
                </Typography>
              )}
            </Stack>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Người nhận: &nbsp;
              </Typography>
              {address.receiverName}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Địa chỉ: &nbsp;
              </Typography>
              {`${address.streetNumber} ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Số điện thoại: &nbsp;
              </Typography>
              {address.phoneNumber}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                color="error"
                size="small"
                startIcon={<Iconify icon={'eva:trash-2-outline'} />}
                onClick={() => {}}
                sx={{ mr: 1 }}
              >
                Xóa
              </Button>
              <Button
                size="small"
                startIcon={<Iconify icon={'eva:edit-fill'} />}
                onClick={() => {}}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Paper>
        ))}

        <Button size="small" startIcon={<Iconify icon={'eva:plus-fill'} />}>
          Thêm địa chỉ mới
        </Button>
      </Stack>
    </Card>
  );
}
