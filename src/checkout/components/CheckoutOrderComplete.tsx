import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
// redux
import { useDispatch } from 'src/common/redux/store';
// routes
// components
import Iconify from 'src/common/components/Iconify';
import { DialogAnimate } from 'src/common/components/animate';
// assets
import { OrderCompleteIllustration } from '../../assets';
import { resetCheckout } from '../checkout.slice';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)',
    },
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ open }: DialogProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleResetStep = () => {
    dispatch(resetCheckout());
    navigate('/');
  };

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, []);

  return (
    <DialogStyle fullScreen open={open}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Cảm ơn bạn đã mua hàng!
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            Cảm ơn bạn đã đặt hàng &nbsp;
            <Link href="#"></Link>
          </Typography>

          <Typography align="left" sx={{ color: 'text.secondary' }}>
            Chúng tôi sẽ gửi thông báo cho bạn trong vòng 5 ngày khi đơn hàng được giao.
            <br /> <br /> Nếu bạn có bất kỳ câu hỏi hay thắc mắc nào, hãy liên hệ với chúng tôi.{' '}
            <br /> <br /> Chúc bạn mọi điều tốt đẹp,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={handleResetStep}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            Tiếp tục mua sắm
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon={'ant-design:file-pdf-filled'} />}
            onClick={handleResetStep}
          >
            Tải xuống PDF
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
}
