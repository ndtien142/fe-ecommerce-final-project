import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
// components
import Iconify from '../../common/components/Iconify';
import { MotionViewport, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const CONTACT_INFO = [
  {
    icon: 'eva:phone-outline',
    title: 'Hotline',
    value: '1800-1234',
    description: 'Miễn phí 24/7',
  },
  {
    icon: 'eva:email-outline',
    title: 'Email',
    value: 'support@Minifurniture.com',
    description: 'Phản hồi trong 2 giờ',
  },
  {
    icon: 'eva:navigation-2-outline',
    title: 'Địa chỉ',
    value: '123 Đại lộ Nội thất, Q.1, TP.HCM',
    description: 'Thứ 2 - Chủ nhật: 8:00 - 22:00',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.default,
}));

const ContactStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-4px)',
  },
}));

// ----------------------------------------------------------------------

export default function HomeContact() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Liên hệ với chúng tôi
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Đội ngũ chuyên gia của Peracta Furniture luôn sẵn sàng hỗ trợ bạn tìm kiếm giải pháp
              nội thất tối ưu
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {CONTACT_INFO.map((contact, index) => (
            <Grid key={contact.title} item xs={12} md={4}>
              <m.div variants={varFade().inUp}>
                <ContactStyle>
                  <Box
                    sx={{
                      mb: 2,
                      mx: 'auto',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                    }}
                  >
                    <Iconify icon={contact.icon} width={28} height={28} />
                  </Box>

                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {contact.title}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main' }}>
                    {contact.value}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {contact.description}
                  </Typography>
                </ContactStyle>
              </m.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <m.div variants={varFade().inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                href="/contact-us"
                startIcon={<Iconify icon="eva:phone-outline" />}
                sx={{ px: 4, py: 1.5 }}
              >
                Liên hệ ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/faqs"
                startIcon={<Iconify icon="eva:question-mark-circle-outline" />}
                sx={{ px: 4, py: 1.5 }}
              >
                Câu hỏi thường gặp
              </Button>
            </Stack>
          </m.div>
        </Box>
      </Container>
    </RootStyle>
  );
}
