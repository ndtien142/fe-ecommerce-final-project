import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Typography } from '@mui/material';
// @types
import {
  BillingAddress as Address,
  OnCreateBilling,
} from '../../../common/@types/product/product.interface';
// redux
// If you use redux for billing, import hooks and actions here
import { useDispatch, useSelector } from 'src/common/redux/store';
import { onPrevStep, setAddress, onNextStep } from 'src/checkout/checkout.slice';
// components
import Label from '../../../common/components/Label';
import Iconify from '../../../common/components/Iconify';
import CheckoutSummary from '../cart/CheckoutSummary';
import { useGetListAddress } from '../../hooks/useGetListAddress';
import { IAddress } from 'src/common/@types/address/address.interface';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';

// ----------------------------------------------------------------------

export default function CheckoutAndBillingAddress() {
  // If you use redux, get subtotal/total/discount from store
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.checkout.cart);

  const [open, setOpen] = useState(false);

  const subtotal = cart?.lineItems?.reduce((sum, item) => sum + Number(item.total), 0);
  const total = subtotal; // Adjust if you have shipping/discount logic
  const discount = 0; // Adjust if you have discount logic

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Replace with your redux or context logic if needed
  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onPrevStep());
  };

  const handleCreateBilling = (value: Address) => {
    // dispatch(createBilling(value));
  };

  // Fetch addresses from API
  const { data } = useGetListAddress();
  // Sort addressList: default addresses first
  const addressList = (data?.metadata || [])
    .slice()
    .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {addressList.map((address, index) => (
            <AddressItem
              key={address.id}
              address={address}
              onNextStep={handleNextStep}
              onCreateBilling={handleCreateBilling}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
            >
              Quay lại
            </Button>
            <Button
              size="small"
              onClick={handleClickOpen}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Thêm địa chỉ mới
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal ?? 0} total={total ?? 0} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm open={open} onClose={handleClose} onNextStep={handleNextStep} />
    </>
  );
}

// ----------------------------------------------------------------------

type AddressItemProps = {
  address: IAddress;
  onNextStep: VoidFunction;
  onCreateBilling: OnCreateBilling;
};

function AddressItem({ address, onNextStep, onCreateBilling }: AddressItemProps) {
  const {
    receiverName,
    phoneNumber,
    isDefault,
    city,
    country,
    district,
    status,
    street,
    streetNumber,
    id,
    ward,
    title,
  } = address;
  const dispatch = useDispatch();

  const fullAddress = `${streetNumber} ${street}, ${ward}, ${district}, ${city}, ${country}`;

  const handleCreateBilling = () => {
    dispatch(setAddress(address));
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{receiverName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({title})
        </Typography>

        {isDefault && (
          <Label color="info" sx={{ ml: 1 }}>
            Mặc định
          </Label>
        )}
      </Box>

      <Typography variant="body2" gutterBottom>
        {fullAddress}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {phoneNumber}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 },
        }}
      >
        {!isDefault && (
          <Button variant="outlined" size="small" color="inherit">
            Xóa
          </Button>
        )}
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={handleCreateBilling}>
          Giao đến địa chỉ này
        </Button>
      </Box>
    </Card>
  );
}
