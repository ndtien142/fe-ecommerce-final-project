import React from 'react';
// @mui
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  CardProps,
  Stack,
  Box,
  Chip,
} from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
// utils
import { fDateTime } from '../../../common/utils/formatTime';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

type ActivityType = 'order' | 'payment' | 'shipping' | 'admin' | 'system' | 'user';

type ActivityItem = {
  id: string;
  title: string;
  description?: string;
  time: Date | string | number;
  type: ActivityType;
  actor?: {
    name: string;
    role: string;
  };
  metadata?: {
    orderId?: string;
    amount?: number;
    status?: string;
  };
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  activities: ActivityItem[];
  maxItems?: number;
}

const getActivityConfig = (type: ActivityType) => {
  const configs = {
    order: {
      color: 'primary' as const,
      icon: 'solar:bag-bold',
      bgColor: '#E3F2FD',
    },
    payment: {
      color: 'success' as const,
      icon: 'solar:card-bold',
      bgColor: '#E8F5E8',
    },
    shipping: {
      color: 'info' as const,
      icon: 'solar:delivery-bold',
      bgColor: '#E1F5FE',
    },
    admin: {
      color: 'warning' as const,
      icon: 'solar:shield-user-bold',
      bgColor: '#FFF3E0',
    },
    system: {
      color: 'error' as const,
      icon: 'solar:settings-bold',
      bgColor: '#FFEBEE',
    },
    user: {
      color: 'secondary' as const,
      icon: 'solar:user-bold',
      bgColor: '#F3E5F5',
    },
  };
  return configs[type] || configs.system;
};

export default function WorkflowActivityTimeline({
  title = 'Hoạt động gần đây',
  subheader,
  activities,
  maxItems = 10,
  ...other
}: Props) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Chip
            label={`${activities.length} hoạt động`}
            size="small"
            color="primary"
            variant="outlined"
          />
        }
      />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {displayActivities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isLast={index === displayActivities.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ActivityItemProps = {
  activity: ActivityItem;
  isLast: boolean;
};

function ActivityItem({ activity, isLast }: ActivityItemProps) {
  const { type, title, description, time, actor, metadata } = activity;
  const config = getActivityConfig(type);

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={config.color}
          sx={{
            bgcolor: config.bgColor,
            border: 'none',
            p: 1,
          }}
        >
          <Iconify icon={config.icon} width={16} />
        </TimelineDot>
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent sx={{ pb: isLast ? 0 : 3 }}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {description}
                </Typography>
              )}
            </Box>

            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', minWidth: 'fit-content', ml: 2 }}
            >
              {fDateTime(time)}
            </Typography>
          </Stack>

          {/* Actor Info */}
          {actor && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:user-circle-bold" width={16} sx={{ color: 'text.secondary' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {actor.name} ({actor.role})
              </Typography>
            </Stack>
          )}

          {/* Metadata */}
          {metadata && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {metadata.orderId && (
                <Chip
                  label={`#${metadata.orderId}`}
                  size="small"
                  variant="outlined"
                  color="default"
                  sx={{ height: 20, fontSize: '0.75rem' }}
                />
              )}
              {metadata.amount && (
                <Chip
                  label={`${metadata.amount.toLocaleString()} VND`}
                  size="small"
                  variant="outlined"
                  color="success"
                  sx={{ height: 20, fontSize: '0.75rem' }}
                />
              )}
              {metadata.status && (
                <Chip
                  label={metadata.status}
                  size="small"
                  variant="outlined"
                  color="info"
                  sx={{ height: 20, fontSize: '0.75rem' }}
                />
              )}
            </Stack>
          )}
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
}
