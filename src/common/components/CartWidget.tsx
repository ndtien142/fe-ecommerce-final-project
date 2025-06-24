import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// routes
import { PATH_CUSTOMER } from 'src/common/routes/paths';
// components
import Iconify from 'src/common/components/Iconify';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { API_CART } from '../constant/api.constant';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constant/queryKeys.constant';

// ----------------------------------------------------------------------

const RootStyle = styled(RouterLink)(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

interface ICartItemCount {
  message: string;
  metadata: number;
}

export default function CartWidget() {
  const [totalItems, setTotalItems] = useState<number>();
  const { data } = useQuery([QUERY_KEYS.CART_COUNT], async () => {
    const response = await axiosInstance.get<unknown, ICartItemCount>(`${API_CART}/count`);
    return response.metadata ?? 0;
  });

  useEffect(() => {
    setTotalItems(data);
  }, [data]);

  return (
    <RootStyle to={PATH_CUSTOMER.eCommerce.checkout}>
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon={'eva:shopping-cart-fill'} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
