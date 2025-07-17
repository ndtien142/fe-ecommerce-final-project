import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Button, Typography, IconButton } from '@mui/material';
// utils
import { fCurrency } from '../../common/utils/formatNumber';
// @types
import { IProductApiResponse } from '../../common/@types/product/product.interface';
// components
import Label from '../../common/components/Label';
import Iconify from '../../common/components/Iconify';
import { useAddToCart } from '../hooks/useAddToCart';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { PATH_CUSTOMER, PATH_AUTH } from 'src/common/routes/paths';
import { useSelector, useDispatch } from 'src/common/redux/store';
import { selectIsAuthenticated } from 'src/auth/login/auth.slice';
import { setLastVisitedProduct } from 'src/common/redux/slices/lastVisited';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  product: IProductApiResponse;
};

type FormValues = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function ProductSummary({ product }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { mutate } = useAddToCart();

  const { id, name, price, priceSale, flag, inventoryType, stock } = product;

  const available = stock;
  const defaultValues = {
    id,
    name,
    price: Number(price),
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm<FormValues>({
    defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;
  const values = watch();

  const handleAddCart = async (data: FormValues) => {
    if (!isAuthenticated) {
      // Save current product URL and redirect to login
      dispatch(setLastVisitedProduct(window.location.pathname));
      navigate(PATH_AUTH.login);
      return;
    }

    mutate(
      {
        productId: String(data.id),
        quantity: data.quantity,
        price: priceSale ? Number(priceSale) : data.price,
      },
      {
        onError: (error: any) => {
          showErrorSnackbar(
            error?.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng'
          );
        },
        onSuccess: () => {
          showSuccessSnackbar('Sản phẩm đã được thêm vào giỏ hàng');
        },
      }
    );
  };

  const handleBuyNow = async (data: FormValues) => {
    if (!isAuthenticated) {
      // Save current product URL and redirect to login
      dispatch(setLastVisitedProduct(window.location.pathname));
      navigate(PATH_AUTH.login);
      return;
    }

    console.log('Buy now:', data);
    mutate(
      {
        productId: String(data.id),
        quantity: data.quantity,
        price: data.price,
      },
      {
        onError: (error: any) => {
          showErrorSnackbar(
            error?.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng'
          );
        },
        onSuccess: () => {
          showSuccessSnackbar('Sản phẩm đã được thêm vào giỏ hàng');
          navigate(PATH_CUSTOMER.eCommerce.checkout);
        },
      }
    );
  };

  useEffect(() => {
    dispatch(setLastVisitedProduct(window.location.pathname));
  }, []);

  return (
    <RootStyle>
      <Label
        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
        color={inventoryType === 'in_stock' ? 'success' : 'error'}
        sx={{ textTransform: 'uppercase' }}
      >
        {sentenceCase(inventoryType || '')}
      </Label>

      <Typography
        variant="overline"
        sx={{
          mt: 2,
          mb: 1,
          display: 'block',
          color: flag === ('sale' as typeof flag) ? 'error.main' : 'info.main',
        }}
      >
        {flag}
      </Typography>

      <Typography variant="h5" paragraph>
        {name}
      </Typography>

      {/* <Typography
        variant="body2"
        sx={{ mb: 2 }}
        dangerouslySetInnerHTML={{ __html: description || '' }}
      /> */}

      <Typography variant="h4" sx={{ mb: 3 }}>
        {priceSale ? (
          <>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 1 }}
            >
              {fCurrency(Number(price))}
            </Box>
            <>{fCurrency(Number(priceSale))}</>
          </>
        ) : (
          <>{fCurrency(Number(price))}</>
        )}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Số lượng
        </Typography>
        <Incrementer
          quantity={values.quantity}
          available={available}
          onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
          onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
        />
        <Typography variant="caption" component="div" sx={{ ml: 2, color: 'text.secondary' }}>
          Còn lại: {available}
        </Typography>
      </Stack>

      <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
        <Button
          fullWidth
          size="large"
          color="warning"
          variant="contained"
          startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
          onClick={handleSubmit(handleAddCart)}
          sx={{ whiteSpace: 'nowrap' }}
          disabled={available < 1}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={available < 1}
          onClick={handleSubmit(handleBuyNow)}
        >
          Mua ngay
        </Button>
      </Stack>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type IncrementerProps = {
  quantity: number;
  available: number;
  onIncrementQuantity: VoidFunction;
  onDecrementQuantity: VoidFunction;
};

function Incrementer({
  available,
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
}: IncrementerProps) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton
        size="small"
        color="inherit"
        disabled={quantity <= 1}
        onClick={onDecrementQuantity}
      >
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton
        size="small"
        color="inherit"
        disabled={quantity >= available}
        onClick={onIncrementQuantity}
      >
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
