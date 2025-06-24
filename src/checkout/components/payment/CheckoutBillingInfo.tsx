import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
// redux
import { useSelector } from 'src/common/redux/store';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ onBackStep }: Props) {
  const address = useSelector((state) => state.checkout.address);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Địa chỉ nhận hàng"
        action={
          <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={onBackStep}>
            Sửa
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {address?.receiverName}&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            ({address?.title})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {address
            ? `${address.streetNumber} ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`
            : ''}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {address?.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
