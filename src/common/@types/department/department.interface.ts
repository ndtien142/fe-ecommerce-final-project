// src/common/@types/department/department.interface.ts

import { PaginationMeta } from '../common.interface'; // Giả sử bạn có định nghĩa PaginationMeta ở một file khác

// Interface mô tả phòng ban
export interface IDepartment {
  departmentId: string; // Mã phòng ban
  departmentName: string; // Tên phòng ban
  description?: string; // Mô tả phòng ban (tuỳ chọn)
  isActive: boolean; // Trạng thái hoạt động của phòng ban
  createdAt: string; // Thời gian tạo
  updatedAt: string; // Thời gian cập nhật
}

// Interface phản hồi khi lấy thông tin phòng ban
export interface IDepartmentResponse {
  departmentId: string; // Mã phòng ban
  departmentName: string; // Tên phòng ban
  description?: string; // Mô tả phòng ban (tuỳ chọn)
  isActive: boolean; // Trạng thái hoạt động của phòng ban
  createdAt: string; // Thời gian tạo
  updatedAt: string;
  metadata: IDepartment; // Thời gian cập nhật
}

// Interface phòng ban trong biên lai mượn
export interface IRoomOfBorrowReceipt {
  roomId: string; // Mã phòng
  roomName: string; // Tên phòng
  roomStatus: boolean; // Trạng thái phòng (hoạt động hay không)
  department: IDepartmentOfBorrowReceipt; // Phòng ban của phòng mượn
}

// Interface phòng ban của phòng mượn
export interface IDepartmentOfBorrowReceipt {
  departmentId: string; // Mã phòng ban
  departmentName: string; // Tên phòng ban
}

// Interface phòng
export interface IRoom {
  id: string; // Mã phòng
  name: string; // Tên phòng
  notes: string;
  status: boolean; // Trạng thái phòng (hoạt động hay không)
  department: IDepartmentOfRoom; // Phòng ban của phòng
}

// Interface phòng ban của phòng
export interface IDepartmentOfRoom {
  id: string; // Mã phòng ban
  name: string; // Tên phòng ban
  notes?: string; // Mô tả phòng ban (tuỳ chọn)
  status: boolean; // Trạng thái phòng ban (hoạt động hay không)
}

// Phản hồi API cho danh sách phòng
export interface IListRoomResponse {
  status: number; // Mã trạng thái của phản hồi
  message: string; // Thông điệp phản hồi
  metadata: {
    code: number; // Mã trạng thái của metadata
    metadata: IRoom[]; // Danh sách phòng
    meta: PaginationMeta; // Thông tin phân trang
  };
}

// Phản hồi API cho danh sách phòng ban
export interface IListDepartmentResponse {
  status: number; // Mã trạng thái của phản hồi
  message: string; // Thông điệp phản hồi
  metadata: {
    code: number; // Mã trạng thái của metadata
    metadata: IDepartment[]; // Danh sách phòng ban
    meta: PaginationMeta; // Thông tin phân trang
  };
}
