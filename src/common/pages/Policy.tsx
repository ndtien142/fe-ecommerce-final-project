// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import { PolicyHero, PolicyContent } from '../sections/policy';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Policy() {
  return (
    <Page title="Privacy Policy & Terms">
      <RootStyle>
        <PolicyHero />
        <PolicyContent />
      </RootStyle>
    </Page>
  );
}
