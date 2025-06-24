import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Radio,
  Stack,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
// @types
import { IShippingMethod } from '../../../common/@types/shipping/shipping.interface';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

type Props = {
  deliveryOptions: IShippingMethod[];
  onApplyShipping: (shipping: number) => void;
};

export default function CheckoutDelivery({ deliveryOptions, onApplyShipping }: Props) {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader title="Phương thức giao hàng" />
      <CardContent>
        <Controller
          name="delivery"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <RadioGroup
                {...field}
                onChange={(event) => {
                  const { value } = event.target;
                  field.onChange(Number(value));
                  onApplyShipping(Number(value));
                }}
              >
                <Stack spacing={2} alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                  {deliveryOptions.map((delivery) => {
                    const selected = field.value === delivery.id;

                    // Defensive: fallback for price if undefined/null
                    let priceDisplay = 'Miễn phí';
                    if (typeof delivery.price === 'number' && delivery.price > 0) {
                      priceDisplay = `${delivery.price.toLocaleString('vi-VN')}₫`;
                    }

                    return (
                      <OptionStyle
                        key={delivery.id}
                        sx={{
                          ...(selected && {
                            boxShadow: (theme) => theme.customShadows.z20,
                          }),
                        }}
                      >
                        <FormControlLabel
                          value={delivery.id}
                          control={
                            <Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />
                          }
                          label={
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="subtitle2">{delivery.name}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {delivery.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', fontWeight: 600 }}
                              >
                                {priceDisplay}
                              </Typography>
                            </Box>
                          }
                          sx={{ py: 3, flexGrow: 1, mr: 0 }}
                        />
                      </OptionStyle>
                    );
                  })}
                </Stack>
              </RadioGroup>
              {!!error && (
                <FormHelperText error sx={{ pt: 1, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </CardContent>
    </Card>
  );
}
