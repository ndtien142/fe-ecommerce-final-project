// components
// sections
import Page from 'src/common/components/Page';
import EcommerceShopContainer from 'src/shop';
import { Container } from '@mui/material';
import useSettings from 'src/common/hooks/useSettings';
import HomeHero from './components/HomeHero';
import HomeCategories from './components/HomeCategories';
import HomeFeatures from './components/HomeFeatures';
import HomeAbout from './components/HomeAbout';
import HomeTestimonials from './components/HomeTestimonials';
import HomeNewsletter from './components/HomeNewsletter';
import HomeContact from './components/HomeContact';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Peracta Furniture - Nội thất chất lượng cho mọi gia đình">
      <HomeHero />
      <HomeCategories />
      <HomeFeatures />
      <HomeAbout />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ my: 10 }}>
        <EcommerceShopContainer />
      </Container>
      <HomeTestimonials />
      <HomeNewsletter />
      <HomeContact />
    </Page>
  );
}
