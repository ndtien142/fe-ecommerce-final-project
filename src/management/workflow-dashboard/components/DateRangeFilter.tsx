import React, { useState } from 'react';
// @mui
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

type PeriodType = 'today' | '7days' | 'month' | 'quarter' | 'year' | 'custom';

interface DateRangeFilterProps {
  value?: {
    period?: PeriodType;
    startDate?: string;
    endDate?: string;
    timezone?: string;
  };
  onChange: (value: {
    period: PeriodType;
    startDate?: string;
    endDate?: string;
    timezone?: string;
  }) => void;
}

const periodOptions = [
  { value: 'today', label: 'Hôm nay', icon: <Iconify icon="solar:calendar-bold" /> },
  { value: '7days', label: '7 ngày', icon: <Iconify icon="solar:calendar-date-bold" /> },
  { value: 'month', label: 'Tháng này', icon: <Iconify icon="solar:calendar-month-bold" /> },
  { value: 'quarter', label: 'Quý này', icon: <Iconify icon="solar:calendar-search-bold" /> },
  { value: 'year', label: 'Năm này', icon: <Iconify icon="solar:calendar-bold-duotone" /> },
  { value: 'custom', label: 'Tùy chọn', icon: <Iconify icon="solar:calendar-minimalistic-bold" /> },
];

export default function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(value?.period || '7days');
  const [startDate, setStartDate] = useState<Date | null>(
    value?.startDate ? new Date(value.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    value?.endDate ? new Date(value.endDate) : null
  );

  const handlePeriodChange = (event: React.MouseEvent<HTMLElement>, newPeriod: PeriodType) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);

      if (newPeriod !== 'custom') {
        // Clear custom dates for predefined periods
        setStartDate(null);
        setEndDate(null);
        onChange({
          period: newPeriod,
          timezone: 'Asia/Ho_Chi_Minh',
        });
      }
    }
  };

  const handleCustomDateApply = () => {
    if (selectedPeriod === 'custom' && startDate && endDate) {
      onChange({
        period: 'custom',
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        timezone: 'Asia/Ho_Chi_Minh',
      });
    }
  };

  const isCustomMode = selectedPeriod === 'custom';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Bộ lọc thời gian
        </Typography>

        <Stack spacing={3}>
          {/* Period Toggle Buttons */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Khoảng thời gian:
            </Typography>
            <ToggleButtonGroup
              value={selectedPeriod}
              exclusive
              onChange={handlePeriodChange}
              aria-label="period selection"
              size="small"
              sx={{ flexWrap: 'wrap' }}
            >
              {periodOptions.map((option) => (
                <ToggleButton
                  key={option.value}
                  value={option.value}
                  aria-label={option.label}
                  sx={{ minWidth: 80 }}
                >
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {option.icon}
                    <Typography variant="caption">{option.label}</Typography>
                  </Stack>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Custom Date Range */}
          {isCustomMode && (
            <>
              <Divider />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Chọn khoảng thời gian:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <DatePicker
                      label="Từ ngày"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                    <Typography>đến</Typography>
                    <DatePicker
                      label="Đến ngày"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      renderInput={(params) => <TextField {...params} size="small" />}
                      minDate={startDate}
                    />
                    <Button
                      variant="contained"
                      onClick={handleCustomDateApply}
                      disabled={!startDate || !endDate}
                      size="small"
                    >
                      Áp dụng
                    </Button>
                  </Stack>
                </LocalizationProvider>
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
