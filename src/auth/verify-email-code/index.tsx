// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'src/common/layouts/LogoOnlyLayout';
// components
import Page from 'src/common/components/Page';
// sections
import VerifyCodeForm from './components/VerifyCodeForm';
import { useSelector } from 'src/common/redux/store';
import { useResendVerifyCode } from './hooks/useResendVerifyCode';
import { default as useMessage } from 'src/common/hooks/useMessage';

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
  const { email, username } = useSelector((state) => state.register);
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { mutate: resendVerifyCode } = useResendVerifyCode();

  const handleResendCode = () => {
    resendVerifyCode(email, {
      onError: (error: any) => {
        showErrorSnackbar(
          error?.response?.data?.message || 'Gửi lại mã xác minh thất bại, vui lòng thử lại sau.'
        );
      },
      onSuccess: () => {
        showSuccessSnackbar('Mã xác minh đã được gửi lại thành công.');
      },
    });
  };

  return (
    <Page title="Verify Code">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Xác minh email của bạn
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email đến {email}, vui lòng nhập mã vào ô
            bên dưới để xác minh email của bạn cho tài khoản {username}.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm />
          </Box>

          <Typography variant="body2">
            Không nhận được mã? &nbsp;
            <Link variant="subtitle2" onClick={handleResendCode}>
              Gửi lại mã
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
