// src/_mock/index.ts

import { randomNumberRange, randomInArray } from './funcs';

// ----------------------------------------------------------------------

// Mock data cho phòng ban
export const _departmentInfo = {
  departmentId: '1',
  departmentName: 'HR Department',
  description: 'Human Resources Department for managing employee relations.',
  isActive: true,
  createdAt: '2023-01-01',
  updatedAt: '2023-03-01',
}

// Mock data cho các phòng ban
export const _departmentList = [...Array(3)].map((_, index) => ({
  departmentId: `dept${index}`,
  departmentName: `Department ${index + 1}`,
  isActive: randomInArray([true, false]),
  createdAt: `2023-01-${index + 1}`,
  updatedAt: `2023-03-${index + 1}`,
}));
