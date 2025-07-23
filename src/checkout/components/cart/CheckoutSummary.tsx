import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';
// utils
import { fCurrency } from '../../../common/utils/formatNumber';
// components
import Iconify from '../../../common/components/Iconify';
import { useSelector } from 'src/common/redux/store';

// ----------------------------------------------------------------------

type Props = {
  total: number;
  discount?: number;
  subtotal: number;
  shipping?: number;
  onEdit?: VoidFunction;
  enableEdit?: boolean;
  onApplyDiscount?: (discount: number) => void;
  enableDiscount?: boolean;
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}: Props) {
  const displayShipping = shipping !== null && shipping !== undefined ? 'Miễn phí' : '-';
  const { appliedCoupon } = useSelector((state) => state.checkout);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Tóm tắt đơn hàng"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon={'eva:edit-fill'} />}>
              Sửa
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tạm tính
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>

          {appliedCoupon && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Giảm giá
              </Typography>
              <Typography variant="subtitle2">
                {appliedCoupon?.metadata?.discount?.discountAmount
                  ? fCurrency(-appliedCoupon.metadata.discount.discountAmount)
                  : '-'}
              </Typography>
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Vận chuyển
            </Typography>
            <Typography variant="subtitle2">
              {shipping ? fCurrency(shipping) : displayShipping}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Tổng cộng</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {appliedCoupon?.metadata?.discount?.discountAmount
                  ? fCurrency(total - appliedCoupon.metadata.discount.discountAmount)
                  : fCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (Đã bao gồm VAT nếu có)
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
