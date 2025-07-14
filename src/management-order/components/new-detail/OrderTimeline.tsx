import React from 'react';
// @mui
import { Box, Card, Typography, Stack, Avatar, Chip, Divider } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { styled } from '@mui/material/styles';
// hooks
// components
import Iconify from '../../../common/components/Iconify';
// utils
import { fDateTime } from '../../../common/utils/formatTime';
import { useGetOrderTimeline } from 'src/management-order/hooks/order-logs/useGetLogTimeline';
import { getTimelineActionConfig } from 'src/management-order/orderWorkflow.utils';

// ----------------------------------------------------------------------

interface Props {
  orderId: number;
}

const TimelineWrapper = styled(Timeline)(({ theme }) => ({
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none',
    },
  },
}));

export default function OrderTimeline({ orderId }: Props) {
  const { data, isLoading } = useGetOrderTimeline(orderId);

  const timeline = data?.metadata?.timeline || [];
  console.log('Order ID:', orderId);
  console.log('Timeline Data:', data);

  console.log('Order Timeline:', timeline);

  if (!data?.metadata?.timeline || data?.metadata?.timeline.length === 0) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lịch sử đơn hàng
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Không có dữ liệu lịch sử
        </Typography>
      </Card>
    );
  }

  const getTimelineDotColor = (action: string) => {
    const config = getTimelineActionConfig(action);
    switch (config.color) {
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'primary':
        return 'primary';
      default:
        return 'grey';
    }
  };

  const getActorAvatar = (actorType: string) => {
    const configs = {
      system: { icon: 'eva:settings-2-fill', color: 'default' },
      admin: { icon: 'eva:shield-fill', color: 'warning' },
      shipper: { icon: 'eva:car-fill', color: 'info' },
      customer: { icon: 'eva:person-fill', color: 'success' },
    };

    const config = configs[actorType as keyof typeof configs] || configs.system;

    return (
      <Avatar sx={{ bgcolor: `${config.color}.main`, width: 32, height: 32 }}>
        <Iconify icon={config.icon} width={20} height={20} />
      </Avatar>
    );
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Lịch sử đơn hàng
          </Typography>
          {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Chip
              label={`${completedSteps}/${totalSteps} bước`}
              color={progress === 100 ? 'success' : 'primary'}
              size="small"
            />
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'grey.300',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Stack> */}
        </Box>

        <Divider />

        {/* Timeline */}
        <TimelineWrapper>
          {!isLoading &&
            timeline.map((item, index) => (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0', flex: 0.2 }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {fDateTime(item.createdAt)}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot
                    color={getTimelineDotColor(item.action)}
                    sx={{
                      boxShadow: 'none',
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }}>{item.icon}</Typography>
                  </TimelineDot>
                  {index < timeline.length - 1 && (
                    <TimelineConnector
                      sx={{
                        bgcolor: 'primary.main',
                      }}
                    />
                  )}
                </TimelineSeparator>

                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {getActorAvatar(item.actorType)}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={item.actorType}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </Stack>

                    {item.note && (
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: 'grey.50',
                          borderRadius: 1,
                          borderLeft: 3,
                          borderColor: 'primary.main',
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          💬 {item.note}
                        </Typography>
                      </Box>
                    )}

                    {item.metadata && typeof item.metadata === 'object' && (
                      <Box sx={{ ml: 5 }}>
                        {item.metadata.trackingNumber && (
                          <Typography variant="caption" color="text.secondary">
                            📦 Mã vận đơn: {item.metadata.trackingNumber}
                          </Typography>
                        )}
                        {item.metadata.shippedBy && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            🚚 Người giao: {item.metadata.shippedBy}
                          </Typography>
                        )}
                        {item.metadata.reason && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            ℹ️ Lý do: {item.metadata.reason}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            ))}
        </TimelineWrapper>

        {/* Current Status */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.lighter',
            borderRadius: 1,
            borderLeft: 4,
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="subtitle2" color="primary.main">
            Trạng thái hiện tại
          </Typography>
          <Typography variant="body2">
            {timeline.length > 0 ? timeline[timeline.length - 1].title : 'Không xác định'}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
