import { useEffect, useState } from 'react';
// @mui
import { Box, Card, Container, Typography, CardHeader } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// guards
import RoleBasedGuard from '../../guards/RoleBasedGuard';
import { HEADER } from 'src/config';
import { useNavigate } from 'react-router';
import { useSelector } from 'src/common/redux/store';

// ----------------------------------------------------------------------

export default function PermissionDenied() {
  const { themeStretch } = useSettings();

  const navigate = useNavigate();
  // Use checkout slice for activeStep
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login, { replace: true });
    }
  }, []);

  return (
    <Box
      component="main"
      sx={{
        px: { lg: 2 },
        pt: {
          xs: `${HEADER.MOBILE_HEIGHT + 20}px`,
          lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 40}px`,
        },
        pb: {
          xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
          lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
        },
      }}
    >
      <Page title="Permission Denied">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <RoleBasedGuard hasContent roles={['admin', 'user']}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
              {[...Array(8)].map((_, index) => (
                <Card key={index}>
                  <CardHeader title={`Card ${index + 1}`} subheader="Proin viverra ligula" />

                  <Typography sx={{ p: 3, color: 'text.secondary' }}>
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In enim justo,
                    rhoncus ut, imperdiet a, venenatis vitae, justo. Vestibulum fringilla pede sit
                    amet augue.
                  </Typography>
                </Card>
              ))}
            </Box>
          </RoleBasedGuard>
        </Container>
      </Page>
    </Box>
  );
}
