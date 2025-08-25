import React from 'react';
import { TableRow, TableCell, Skeleton, Box } from '@mui/material';

interface UserTableSkeletonProps {
  rowsNum?: number;
}

export default function UserTableSkeleton({ rowsNum = 5 }: UserTableSkeletonProps) {
  return (
    <>
      {[...Array(rowsNum)].map((_, index) => (
        <TableRow key={index} hover>
          {/* Avatar + Username */}
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              <Box>
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
            </Box>
          </TableCell>

          {/* Full Name */}
          <TableCell>
            <Skeleton variant="text" width={150} height={20} />
          </TableCell>

          {/* Email */}
          <TableCell>
            <Skeleton variant="text" width={180} height={20} />
          </TableCell>

          {/* Phone Number */}
          <TableCell>
            <Skeleton variant="text" width={120} height={20} />
          </TableCell>

          {/* Role */}
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
          </TableCell>

          {/* Email Verified */}
          <TableCell align="center">
            <Skeleton
              variant="rectangular"
              width={60}
              height={24}
              sx={{ borderRadius: 1, mx: 'auto' }}
            />
          </TableCell>

          {/* Status */}
          <TableCell align="center">
            <Skeleton
              variant="rectangular"
              width={80}
              height={24}
              sx={{ borderRadius: 1, mx: 'auto' }}
            />
          </TableCell>

          {/* Actions */}
          <TableCell align="right">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
