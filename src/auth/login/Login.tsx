// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Link } from '@mui/material';
import Page from 'src/common/components/Page';
import Image from 'src/common/components/Image';
import LoginForm from './component/LoginForm';
import useResponsive from 'src/common/hooks/useResponsive';
import { useSelector } from 'react-redux';
import { isExpiredSelector, setIsExpired } from './login.slice';
import { useEffect } from 'react';
import { default as useMessage } from 'src/common/hooks/useMessage';
import vn from '../../common/locales/vn';
import { dispatch } from '../../common/redux/store';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AUTH } from 'src/common/routes/paths';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '646px',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  backgroundSize: 'contain',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const { showErrorSnackbar } = useMessage();

  const expired = useSelector(isExpiredSelector);
  useEffect(() => {
    if (expired) {
      showErrorSnackbar(vn.expired);
      dispatch(setIsExpired(false));
    }
  }, [expired]);

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Image
              sx={{
                margin: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                padding: 0,
                borderRadius: '0 8px 8px 0',
              }}
              visibleByDefault
              disabledEffect
              src="/logo/background.jpg"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Bạn chưa có tài khoản? {''}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Ấn để bắt đầu
                </Link>
              </Typography>
            )}
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              padding={0}
              sx={{
                mb: 5,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexGrow: 1, justifyItems: 'space-between' }}
              >
                <Typography color={'green'} variant="h4">
                  Hệ thống quản lý tài sản hỗ trợ phòng quản trị trường PTIT
                </Typography>
              </Stack>
            </Stack>

            <LoginForm />
            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
