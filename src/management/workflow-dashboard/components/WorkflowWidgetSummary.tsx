import React from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Stack, Box, CardProps } from '@mui/material';
// utils
import { fShortenNumber, fPercent } from '../../../common/utils/formatNumber';
// theme
import { ColorSchema } from '../../../common/theme/palette';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  icon: string;
  color?: ColorSchema;
  trend?: {
    value: number;
    isIncrease: boolean;
  };
  subtitle?: string;
}

export default function WorkflowWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  trend,
  subtitle,
  sx,
  ...other
}: Props) {
  const trendIcon = trend?.isIncrease ? 'eva:trending-up-fill' : 'eva:trending-down-fill';
  const trendColor = trend?.isIncrease ? 'success' : 'error';

  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3" sx={{ mb: 1 }}>
        {fShortenNumber(total)}
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72, mb: trend ? 1 : 0 }}>
        {title}
      </Typography>

      {trend && (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
          <Iconify
            icon={trendIcon}
            width={16}
            height={16}
            sx={{
              color: (theme: any) => theme.palette[trendColor].main,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: (theme: any) => theme.palette[trendColor].main,
              fontWeight: 'fontWeightMedium',
            }}
          >
            {trend.isIncrease ? '+' : '-'}
            {fPercent(Math.abs(trend.value))}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            so với kỳ trước
          </Typography>
        </Stack>
      )}

      {subtitle && (
        <Typography variant="caption" sx={{ display: 'block', opacity: 0.48, mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </RootStyle>
  );
}
