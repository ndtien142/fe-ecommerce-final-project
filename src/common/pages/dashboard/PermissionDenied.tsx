import { useState } from 'react';
// @mui
import {
  Box,
  Card,
  Container,
  Typography,
  CardHeader,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// guards
import RoleBasedGuard from '../../guards/RoleBasedGuard';
import { HEADER } from 'src/config';

// ----------------------------------------------------------------------

export default function PermissionDenied() {
  const { themeStretch } = useSettings();

  const [role, setRole] = useState('admin');

  const handleChangeRole = (event: React.MouseEvent<HTMLElement>, newRole: string | null) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

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
          <RoleBasedGuard hasContent roles={[role]}>
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
