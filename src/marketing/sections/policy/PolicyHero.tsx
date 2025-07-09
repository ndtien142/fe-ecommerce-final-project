import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
//
import { TextAnimate, MotionContainer, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/overlay.svg), url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80)',
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

export default function PolicyHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate
            text="Chính sách"
            sx={{ color: 'primary.main' }}
            variants={varFade().inRight}
          />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="&" sx={{ mr: 2 }} />
            <TextAnimate text="điều khoản" />
          </Box>

          <m.div variants={varFade().inUp}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Sự tin tưởng của bạn là ưu tiên hàng đầu. Tìm hiểu các chính sách cho trải nghiệm mua
              sắm nội thất liền mạch.
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
