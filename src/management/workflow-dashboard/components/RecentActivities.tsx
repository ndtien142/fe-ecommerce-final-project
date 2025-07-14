import React from 'react';
// @mui
import { Card, CardHeader, Box, Typography, Avatar, Stack, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

interface RecentActivity {
  id: number;
  orderId: number;
  action: string;
  actorType: string;
  actorName: string;
  timestamp: string;
  description: string;
}

interface RecentActivitiesProps {
  activities?: RecentActivity[];
  title?: string;
  maxItems?: number;
}

export default function RecentActivities({
  activities = [],
  title = 'Hoạt động gần đây',
  maxItems = 10,
}: RecentActivitiesProps) {
  const getActivityIcon = (action: string) => {
    const iconMap: Record<string, string> = {
      delivered: 'eva:checkmark-circle-2-fill',
      picked_up: 'eva:car-fill',
      confirmed: 'eva:done-all-fill',
      payment_completed: 'eva:credit-card-fill',
      cancelled: 'eva:close-circle-fill',
      created: 'eva:plus-circle-fill',
      updated: 'eva:edit-fill',
      shipped: 'eva:paper-plane-fill',
      refunded: 'eva:arrow-back-fill',
    };
    return iconMap[action] || 'eva:activity-fill';
  };

  const getActivityColor = (action: string) => {
    const colorMap: Record<string, string> = {
      delivered: 'success',
      picked_up: 'info',
      confirmed: 'primary',
      payment_completed: 'success',
      cancelled: 'error',
      created: 'info',
      updated: 'warning',
      shipped: 'primary',
      refunded: 'warning',
    };
    return colorMap[action] || 'default';
  };

  const getActorColor = (actorType: string) => {
    const colorMap: Record<string, string> = {
      admin: 'primary',
      user: 'info',
      system: 'secondary',
      payment_gateway: 'success',
      customer: 'warning',
    };
    return colorMap[actorType] || 'default';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader title={title} />
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Chưa có hoạt động nào
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title={title} />
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          {activities.slice(0, maxItems).map((activity) => (
            <Box
              key={activity.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: (theme) => {
                    const colorName = getActivityColor(activity.action);
                    const paletteColor = theme.palette[colorName as keyof typeof theme.palette];
                    return alpha(
                      paletteColor && typeof paletteColor === 'object' && 'main' in paletteColor
                        ? paletteColor.main
                        : theme.palette.primary.main,
                      0.1
                    );
                  },
                  color: (theme) => {
                    const colorName = getActivityColor(activity.action);
                    const paletteColor = theme.palette[colorName as keyof typeof theme.palette];
                    return paletteColor &&
                      typeof paletteColor === 'object' &&
                      'main' in paletteColor
                      ? paletteColor.main
                      : theme.palette.primary.main;
                  },
                  width: 40,
                  height: 40,
                }}
              >
                <Iconify icon={getActivityIcon(activity.action)} />
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle2" noWrap>
                    Đơn hàng #{activity.orderId}
                  </Typography>
                  <Chip
                    label={activity.actorName}
                    size="small"
                    color={getActorColor(activity.actorType) as any}
                    variant="outlined"
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {activity.description}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {formatTimestamp(activity.timestamp)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}
