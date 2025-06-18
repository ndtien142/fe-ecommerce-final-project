// components
// sections
import Page from 'src/common/components/Page';
import HeaderHome from './components/HeaderHome';
import EcommerceShopContainer from 'src/shop';
import { Container } from '@mui/material';
import useSettings from 'src/common/hooks/useSettings';
import HeroSection from './components/HeroSections';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Điểm bắt đầu không gian của bạn" mt={15} mb={10}>
      <HeroSection />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderHome />
        <EcommerceShopContainer />
      </Container>
    </Page>
  );
}
