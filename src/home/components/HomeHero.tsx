import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Stack } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: 600,
  backgroundImage: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.primary.dark} 100%), 
    url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'overlay',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    minHeight: 700,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <Stack spacing={5} sx={{ maxWidth: 600 }}>
            <div>
              <TextAnimate
                text="Mini"
                sx={{ color: 'primary.light' }}
                variants={varFade().inRight}
              />
              <br />
              <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
                <TextAnimate text="Furniture" sx={{ mr: 2 }} />
                <TextAnimate text="Vietnam" />
              </Box>
            </div>

            <m.div variants={varFade().inUp}>
              <Typography variant="h3" sx={{ fontWeight: 'fontWeightMedium', mb: 3 }}>
                Khám phá nội thất hiện đại cho không gian sống lý tưởng
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                Mang đến sự tinh tế, tiện nghi và phong cách cho ngôi nhà của bạn với bộ sưu tập nội
                thất cao cấp từ Mini Furniture.
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/shop"
                  sx={{
                    bgcolor: 'common.white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Khám phá ngay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/about-us"
                  sx={{
                    borderColor: 'common.white',
                    color: 'common.white',
                    '&:hover': {
                      borderColor: 'common.white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Về chúng tôi
                </Button>
              </Stack>
            </m.div>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
