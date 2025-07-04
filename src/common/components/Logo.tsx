import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297.94 180.32">
        <title>FPT logo</title>
        <path
          d="M609,449.58a38.61,38.61,0,0,0-35.85,25.13c-.29.75-1.28,3.85-1.28,3.85l-22.62,95.87h52c17.86,0,33-12.61,37.26-29.59L661,449.57Z"
          transform="translate(-363.03 -421.84)"
          style={{ fill: '#199246' }}
        />
        <path
          d="M522.41,421.84a38,38,0,0,0-36.65,27.26,36.59,36.59,0,0,0-.85,3.59l-35.3,149.47h51.95a38.06,38.06,0,0,0,37-28.34h0l35.88-152Z"
          transform="translate(-363.03 -421.84)"
          style={{ fill: '#ef7024' }}
        />
        <path
          d="M422.79,449.58c-16.85,0-31.26,11.21-36.44,26.75-.11.35-.23.69-.33,1l-.87,3.34L363,574.42h53.25a37.39,37.39,0,0,0,34.87-24.79l2.11-8.92,21.51-91.14Z"
          transform="translate(-363.03 -421.84)"
          style={{ fill: '#1666a8' }}
        />
        <path
          d="M413.07,480.71l0,.08h-.8a16.44,16.44,0,0,0-10.41,3.85,16.93,16.93,0,0,0-5.81,7.92h0l-11.93,50.65h.67a16.54,16.54,0,0,0,10.52-3.88A16.76,16.76,0,0,0,401.4,530L404,519h23.72a16.87,16.87,0,0,0,10.52-3.91,16.41,16.41,0,0,0,6.13-9.32l.15-.66-37.21,0,2.47-10.45,32.23,0a16.53,16.53,0,0,0,10.41-3.81,17,17,0,0,0,6.07-9.32l.16-.67Z"
          transform="translate(-363.03 -421.84)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M544.63,483.79a10.91,10.91,0,0,0-7.94-3l-45.48,0-14.69,62.42h0l0,.08h.68A17.88,17.88,0,0,0,493.84,530l2.64-11.12,31.48,0c3.69,0,7-.42,10.2-2.94a19.26,19.26,0,0,0,6.36-10.21l2.77-11.57a14.65,14.65,0,0,0,.32-2.84,9.83,9.83,0,0,0-3-7.52Zm-14.19,21.27-30.68,0,2.48-10.46,30.68,0Z"
          transform="translate(-363.03 -421.84)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M637.16,483.82a10.75,10.75,0,0,0-7.92-3h-48l-.09.44a14.05,14.05,0,0,0-.35,2.74,10.13,10.13,0,0,0,3,7.62,10.73,10.73,0,0,0,7.92,3h10L590.3,543.21H591A17.86,17.86,0,0,0,607.63,530L616,494.64H639.7l.09-.44a14.62,14.62,0,0,0,.33-2.84,9.91,9.91,0,0,0-3-7.54"
          transform="translate(-363.03 -421.84)"
        />
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
