// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../common/components/Page';
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
    <Page title="Chính sách & Điều khoản - FPT Furniture">
      <RootStyle>
        <PolicyHero />
        <PolicyContent />
      </RootStyle>
    </Page>
  );
}
