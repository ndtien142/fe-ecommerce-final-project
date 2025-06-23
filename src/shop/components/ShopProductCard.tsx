import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_CUSTOMER } from '../../common/routes/paths';
// utils
import { fCurrency } from '../../common/utils/formatNumber';
// @types
import { IProductApiResponse } from 'src/common/@types/product/product.interface';
// components
import Label from '../../common/components/Label';
import Image from '../../common/components/Image';
import { ColorPreview } from '../../common/components/color-utils';

// ----------------------------------------------------------------------

type Props = {
  product: IProductApiResponse;
};

export default function ShopProductCard({ product }: Props) {
  const name = product.name;
  const cover = product.thumbnail || (product.images?.find((img) => img.isPrimary)?.imageUrl ?? '');
  const price = Number(product.price);
  const priceSale = product.priceSale ? Number(product.priceSale) : undefined;
  const status = product.flag || '';
  const colors: string[] = []; // Not in API, fallback to empty
  const linkTo = PATH_CUSTOMER.eCommerce.view(paramCase(product.slug));

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={status?.toString() === 'sale' ? 'error' : 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}

        <Image alt={name} src={cover} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {priceSale ? (
              <>
                <Typography
                  component="span"
                  sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
                >
                  {fCurrency(price)}
                </Typography>
                <Typography variant="subtitle1">{fCurrency(priceSale)}</Typography>
              </>
            ) : (
              <Typography variant="subtitle1">{fCurrency(price)}</Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
