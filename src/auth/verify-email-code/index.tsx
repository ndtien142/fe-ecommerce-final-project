// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'src/common/layouts/LogoOnlyLayout';
// components
import Page from 'src/common/components/Page';
// sections
import VerifyCodeForm from './components/VerifyCodeForm';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  return (
    <Page title="Verify Code">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Xác minh email của bạn
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email đến acb@domain, vui lòng nhập mã vào
            ô bên dưới để xác minh email của bạn.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm />
          </Box>

          <Typography variant="body2">
            Không có mã? &nbsp;
            <Link variant="subtitle2" onClick={() => {}}>
              Gửi lại mã
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
