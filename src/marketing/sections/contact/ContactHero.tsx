import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
//
import { TextAnimate, MotionContainer, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Cửa hàng chính',
    address: '123 Đại lộ Nội thất, Quận 1, TP.HCM',
    phoneNumber: '(028) 3822-1234',
  },
  {
    country: 'Showroom Hà Nội',
    address: '456 Phố Huế, Hai Bà Trưng, Hà Nội',
    phoneNumber: '(024) 3971-5678',
  },
  {
    country: 'Chi nhánh Đà Nẵng',
    address: '789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    phoneNumber: '(0236) 3888-9012',
  },
  {
    country: 'Chăm sóc khách hàng',
    address: '24/7 Hỗ trợ trực tuyến',
    phoneNumber: '1800-1234 (Miễn phí)',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/overlay.svg), url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Tìm" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="Peracta" sx={{ mr: 2 }} />
            <TextAnimate text="Furniture" sx={{ mr: 2 }} />
            <TextAnimate text="gần bạn" />
          </Box>

          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid key={contact.country} item xs={12} sm={6} md={3} lg={2} sx={{ pr: { md: 5 } }}>
                <m.div variants={varFade().in}>
                  <Typography variant="h6" paragraph>
                    {contact.country}
                  </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                  <Typography variant="body2">
                    {contact.address}
                    <br /> {contact.phoneNumber}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
