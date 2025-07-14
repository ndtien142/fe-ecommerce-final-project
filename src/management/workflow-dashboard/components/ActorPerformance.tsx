import React from 'react';
// @mui
import { Box, Card, Typography, Stack, Avatar } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';
import { fPercent } from '../../../common/utils/formatNumber';

// ----------------------------------------------------------------------

interface ActorPerformanceProps {
  actorStats?: Array<{
    actorType: string;
    count: number;
    percentage: number;
  }>;
}

export default function ActorPerformance({ actorStats }: ActorPerformanceProps) {
  if (!actorStats || actorStats.length === 0) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Hiệu suất theo vai trò
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Không có dữ liệu
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Hiệu suất theo vai trò
      </Typography>
      <Stack spacing={2}>
        {actorStats.map((item) => (
          <Stack
            key={item.actorType}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor:
                    item.actorType === 'admin'
                      ? 'warning.lighter'
                      : item.actorType === 'shipper'
                      ? 'info.lighter'
                      : item.actorType === 'customer'
                      ? 'success.lighter'
                      : 'grey.300',
                  color:
                    item.actorType === 'admin'
                      ? 'warning.main'
                      : item.actorType === 'shipper'
                      ? 'info.main'
                      : item.actorType === 'customer'
                      ? 'success.main'
                      : 'grey.600',
                  width: 40,
                  height: 40,
                }}
              >
                <Iconify
                  icon={
                    item.actorType === 'admin'
                      ? 'eva:shield-fill'
                      : item.actorType === 'shipper'
                      ? 'eva:car-fill'
                      : item.actorType === 'customer'
                      ? 'eva:person-fill'
                      : 'eva:settings-2-fill'
                  }
                />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{item.actorType}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.count} hành động
                </Typography>
              </Box>
            </Stack>
            <Typography variant="subtitle2">{fPercent(item.percentage)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
