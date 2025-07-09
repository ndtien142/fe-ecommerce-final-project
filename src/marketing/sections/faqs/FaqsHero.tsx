import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';
import InputStyle from '../../../common/components/InputStyle';
import { MotionContainer, TextAnimate, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage:
    'url(/assets/overlay.svg), url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle spacing={5}>
          <div>
            <TextAnimate
              text="Câu hỏi"
              sx={{ color: 'primary.main' }}
              variants={varFade().inRight}
            />
            <br />
            <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
              <TextAnimate text="thường" sx={{ mr: 2 }} />
              <TextAnimate text="gặp" />
            </Box>
          </div>

          <m.div variants={varFade().inUp}>
            <InputStyle
              stretchStart={280}
              placeholder="Tìm kiếm câu hỏi về nội thất..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={'eva:search-fill'}
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'common.white',
                },
              }}
            />
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
