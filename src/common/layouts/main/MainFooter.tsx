import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Peracta Furniture',
    children: [
      { name: 'Về chúng tôi', href: PATH_PAGE.about },
      { name: 'Liên hệ', href: PATH_PAGE.contact },
      { name: 'Câu hỏi thường gặp', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Dịch vụ',
    children: [
      { name: 'Nội thất phòng khách', href: '#' },
      { name: 'Nội thất phòng ngủ', href: '#' },
      { name: 'Nội thất văn phòng', href: '#' },
      { name: 'Thi công nội thất', href: '#' },
    ],
  },
  {
    headline: 'Hỗ trợ',
    children: [
      { name: 'Chính sách đổi trả', href: '#' },
      { name: 'Bảo hành sản phẩm', href: '#' },
      { name: 'Giao hàng & Lắp đặt', href: '#' },
    ],
  },
  {
    headline: 'Liên hệ',
    children: [
      { name: 'hotline@peractafurniture.vn', href: '#' },
      { name: '1900 1234 - Hotline 24/7', href: '#' },
      { name: 'Hà Nội, Số 8 Tôn Thất Thuyết', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Peracta Furniture - Điểm đến tin cậy cho mọi nhu cầu nội thất của bạn. Chúng tôi cung
              cấp các sản phẩm nội thất chất lượng cao với thiết kế hiện đại, phù hợp với mọi không
              gian sống và làm việc.
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2024 Peracta Furniture. Tất cả quyền được bảo lưu
        </Typography>
      </Container>
    </RootStyle>
  );
}
