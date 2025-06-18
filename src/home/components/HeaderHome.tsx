import { Card, Grid, Container } from '@mui/material';
import React from 'react';
import useSettings from 'src/common/hooks/useSettings';
import CustomCarousel from './CustomCarousel';
import SidebarRight from './SidebarRight';

const HeaderHome = () => {
  const { themeStretch } = useSettings();
  // const { data } = useGetCategories();
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid container spacing={3} pt={3}>
        <Grid item md={3} xs={4}>
          <Card
            elevation={3}
            sx={{
              p: 3,
              boxShadow: '0 0 5px rgba(0, 0, 0, .15)',
            }}
          >
            {/* <CategoryTree categories={data?.metadata?.items || []} /> */}
          </Card>
        </Grid>
        <Grid item md={7} xs={4}>
          <Card elevation={3} sx={{ boxShadow: '0 0 5px rgba(0, 0, 0, .15)', maxHeight: 700 }}>
            <CustomCarousel
              images={[
                'https://cdn.hoasenhome.vn/magestore/bannerslider/images/x/a/xaydung-01_1_.jpg',
                'https://cdn.hoasenhome.vn/magestore/bannerslider/images/z/5/z5672727643145_fb7aec9c5175a2dd448ae9f2384689db.jpg',
                'https://cdn.hoasenhome.vn/magestore/bannerslider/images/b/a/banner_key.jpg',
                'https://cdn.hoasenhome.vn/magestore/bannerslider/images/s/n/snss.jpg',
                'https://cdn.hoasenhome.vn/magestore/bannerslider/images/w/_/w_tuslo2.jpg',
              ]}
            />
          </Card>
        </Grid>
        <Grid item md={2} xs={4}>
          <Card elevation={3} sx={{ boxShadow: '0 0 5px rgba(0, 0, 0, .15)' }}>
            <SidebarRight />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderHome;
