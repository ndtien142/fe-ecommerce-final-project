import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../common/components/Iconify';
import { MotionViewport, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

export default function HomeNewsletter() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Đăng ký nhận tin tức mới nhất
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, opacity: 0.8 }}>
              Nhận thông báo về các sản phẩm mới, ưu đãi đặc biệt và mẹo trang trí nội thất hữu ích
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
              <TextField
                fullWidth
                placeholder="Nhập email của bạn"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'common.white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'common.white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  minWidth: 120,
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
                endIcon={<Iconify icon="eva:arrow-forward-fill" />}
              >
                Đăng ký
              </Button>
            </Stack>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất kỳ lúc nào.
            </Typography>
          </m.div>
        </Box>
      </Container>
    </RootStyle>
  );
}
