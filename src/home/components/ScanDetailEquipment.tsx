import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { default as useMessage } from 'src/common/hooks/useMessage';

type Props = {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
};

const videoConstraints = {
  facingMode: 'environment',
};

export default function WebcamScanQRCode({ onScan, onError, disabled }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingExport, setLoadingExport] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setScanning(false); // Tắt cam sau khi quét
        handleScanSuccess(code.data);
      }
    };
  }, []);

  const handleScanSuccess = async (serialNumber: string) => {
    try {
      setScannedData(serialNumber);
      onScan(serialNumber);
      showSuccessSnackbar('Đã quét thành công!');
    } catch (err: any) {
      const msg = err?.message || 'Có lỗi xảy ra khi xử lý QR';
      setError(msg);
      showErrorSnackbar(msg);
    } finally {
      setLoadingExport(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanning && !disabled) {
      interval = setInterval(() => {
        capture();
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [capture, scanning, disabled]);

  const handleStartScan = () => {
    setError(null);
    setScannedData(null);
    setScanning(true);
  };

  const handleStopScan = () => {
    setScanning(false);
    setError(null);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {disabled ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Đã quét đủ số lượng thiết bị. Không thể quét thêm.
        </Typography>
      ) : scanning ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            style={{ width: '100%', maxWidth: 400, margin: 'auto', borderRadius: 8 }}
          />
          <Typography sx={{ mt: 2 }}>Đưa mã QR vào vùng quét</Typography>
          <CircularProgress sx={{ mt: 2 }} />
          <Button variant="outlined" color="warning" sx={{ mt: 2 }} onClick={handleStopScan}>
            Tắt
          </Button>
        </>
      ) : loadingExport ? (
        <Box>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            Đang xuất thiết bị...
          </Typography>
          <CircularProgress />
        </Box>
      ) : scannedData ? (
        <Box>
          <Iconify icon="eva:checkmark-circle-2-fill" color="#2ecc40" width={48} height={48} />
          <Typography variant="h6" color="success.main" sx={{ mb: 2, mt: 1 }}>
            Đã quét thành công!
          </Typography>
          <Typography>Thông tin thiết bị: {scannedData}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleStartScan}>
            Quét tiếp
          </Button>
        </Box>
      ) : (
        <Button variant="contained" onClick={handleStartScan}>
          Quét
        </Button>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
