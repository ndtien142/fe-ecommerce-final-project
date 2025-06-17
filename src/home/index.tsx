import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { useGetDetailEquipmentBySerial } from 'src/equipment/detail-serial-item/hooks/useGetDetailEquipmentBySerial';
import ScanDetailEquipment from 'src/home/components/ScanDetailEquipment';
import { default as useMessage } from 'src/common/hooks/useMessage';
import Iconify from 'src/common/components/Iconify';

const GeneralAppHome = () => {
  const { themeStretch } = useSettings();
  const [scanQR, setScanQR] = useState<string | null>(null);
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const { data, fetchData, isLoading } = useGetDetailEquipmentBySerial({
    onError: () => {
      showErrorSnackbar('Lấy về serial number không đúng');
    },
    onSuccess: () => {
      showSuccessSnackbar('Lấy về data thành công');
    },
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (scanQR) {
      fetchData(scanQR);
    }
  }, [scanQR]);

  const handleScanEquipmentQRCode = (result: string) => {
    if (result) {
      setScanQR(result);
      setCurrentImageIndex(0);
    }
  };

  const images = (data as any)?.images || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              {data ? (
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                  {/* Image */}
                  <Box sx={{ textAlign: 'center' }}>
                    {images.length > 0 ? (
                      <>
                        <CardMedia
                          component="img"
                          src={images[currentImageIndex].imageUrl}
                          alt={`Ảnh ${currentImageIndex + 1}`}
                          sx={{
                            width: 300,
                            height: 300,
                            objectFit: 'cover',
                            borderRadius: 2,
                            border: '1px solid #ccc',
                          }}
                        />
                        {images.length > 1 && (
                          <Stack direction="row" spacing={5} mt={2} justifyContent="center">
                            <IconButton onClick={handlePrevImage} edge="end">
                              <Iconify icon={'ooui:arrow-next-rtl'} />
                            </IconButton>

                            <IconButton onClick={handleNextImage} edge="end">
                              <Iconify icon={'ooui:arrow-next-ltr'} />
                            </IconButton>
                          </Stack>
                        )}
                      </>
                    ) : (
                      <Typography>Không có ảnh</Typography>
                    )}
                  </Box>

                  {/* Info */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Thông tin thiết bị:
                    </Typography>
                    <Typography>
                      <strong>Mã serial:</strong> {data.serialNumber}
                    </Typography>
                    <Typography>
                      <strong>Mô tả:</strong> {data.description}
                    </Typography>
                    <Typography>
                      <strong>Trạng thái:</strong> {data.status}
                    </Typography>
                    <Typography>
                      <strong>Nhóm thiết bị:</strong> {data.groupEquipment?.name}
                    </Typography>
                    <Typography>
                      <strong>Ghi chú phiếu nhập:</strong> {data.importReceipt?.note}
                    </Typography>
                    <Typography>
                      <strong>Ngày bắt đầu sử dụng:</strong>{' '}
                      {new Date(data?.dayOfFirstUse ?? '').toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography>
                      <strong>Phòng:</strong> {data.room?.name || 'Chưa có'} -{' '}
                      {data.room?.department?.name || ''}
                    </Typography>
                    <Typography>
                      <strong>Nhà cung cấp:</strong>{' '}
                      {data.importReceipt?.supplier?.name || 'Không có'}
                    </Typography>
                  </Box>
                </Stack>
              ) : (
                <Typography>Chưa có dữ liệu thiết bị</Typography>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <ScanDetailEquipment onScan={handleScanEquipmentQRCode} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default GeneralAppHome;
