import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Radio,
  Stack,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
// @types
import { IPaymentMethod } from '../../../common/@types/payment/payment.interface';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
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
  paymentOptions: IPaymentMethod[];
  cardOptions: { value: number; label: string }[];
};

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions }: Props) {
  const { control } = useFormContext();

  const isDesktop = true;

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Phương thức thanh toán" />
      <CardContent>
        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <RadioGroup row {...field}>
                <Stack spacing={2} width={1} direction={{ xs: 'column', md: 'column' }}>
                  {paymentOptions.map((method) => {
                    const { id, name, description, provider } = method;
                    const hasChildren = provider === 'credit_card';
                    const selected = field.value === id;

                    return (
                      <OptionStyle
                        key={id}
                        sx={{
                          ...(selected && {
                            boxShadow: (theme) => theme.customShadows.z20,
                          }),
                          ...(hasChildren && { flexWrap: 'wrap' }),
                        }}
                      >
                        <FormControlLabel
                          value={id}
                          control={
                            <Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />
                          }
                          label={
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="subtitle2">{name}</Typography>
                              <Typography>Nhà cung cấp: {provider}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {description}
                              </Typography>
                            </Box>
                          }
                          sx={{ flexGrow: 1, py: 3 }}
                        />

                        {/* Add icons if your API provides them */}

                        {hasChildren && (
                          <Collapse in={field.value === id} sx={{ width: 1 }}>
                            <TextField
                              select
                              fullWidth
                              label="Chọn thẻ"
                              SelectProps={{ native: true }}
                            >
                              {cardOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>

                            <Button
                              size="small"
                              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                              sx={{ my: 3 }}
                            >
                              Thêm thẻ mới
                            </Button>
                          </Collapse>
                        )}
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
