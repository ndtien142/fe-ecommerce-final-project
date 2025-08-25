# Frontend User Management Integration Guide

## 📋 Tổng quan về những thay đổi

Đã cập nhật frontend để tương thích với API backend mới với role-based access control.

## 🔄 Các thay đổi chính

### 1. **Cập nhật Interfaces**

#### `IUser` Interface (src/common/@types/user/user.interface.ts)

```typescript
export interface IUser {
  userId: number; // Thay từ string
  username: string; // Từ user_login
  email: string; // Thêm mới
  userStatus: 'normal' | 'pending' | 'blocked' | 'deleted' | 'suspended'; // Thay từ isActive/isBlock
  emailVerified: boolean; // Thay từ isVerified
  userRegistered: string; // Thêm mới
  role: {
    id: number; // Thay từ string
    name: string; // Giữ nguyên
  };
  profile: {
    id: number; // Thêm mới
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    avatarUrl: string;
    createTime: string; // Thay từ createdAt
  } | null; // Có thể null
}
```

#### Management User Interfaces (src/management-user/common/user.interface.ts)

```typescript
// Tạo user thường
export interface ICreateUserData {
  username: string;
  password: string;
  email: string; // Thêm mới (required)
  roleId: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string; // Optional
  address?: string; // Optional
  avatarUrl?: string;
}

// Tạo admin (không cần roleId)
export interface ICreateAdminData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

// Cập nhật user (admin only)
export interface IUpdateUserData {
  userId: number; // Thay từ string
  username?: string;
  email?: string;
  roleId?: number;
  userStatus?: 'normal' | 'pending' | 'blocked' | 'deleted' | 'suspended';
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

// Cập nhật profile hiện tại (user + admin)
export interface IUpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}
```

### 2. **Cập nhật Services**

#### Thêm API mới:

- `fetchCurrentUserProfile()` - GET /user/profile
- `updateCurrentUserProfile()` - PUT /user/profile
- `createAdmin()` - POST /user/admin

#### Cập nhật API hiện có:

- `fetchUser(userId: number)` - Thay từ string
- `markUserAsBlocked()` - Cập nhật type
- `updateUser()` - Sử dụng IUpdateUserData

### 3. **Thêm Hooks mới**

```typescript
// Hook cho current user profile
useGetCurrentUserProfile();
useUpdateCurrentUserProfile(callback);

// Hook cho admin
useCreateAdmin(callback);
```

### 4. **Cập nhật UserNewEditForm**

#### Tính năng mới:

- ✅ **Switch tạo Admin**: Toggle để tạo admin thay vì user thường
- ✅ **Email field**: Bắt buộc cho tất cả user
- ✅ **User Status**: Quản lý trạng thái user (normal/blocked/deleted/...)
- ✅ **Role Selection**: Chỉ hiện khi không tạo admin
- ✅ **Form Validation**: Required fields phù hợp

#### Cách sử dụng:

**Tạo User thường:**

```tsx
<UserNewEditForm isEdit={false} />
```

**Tạo Admin:**

```tsx
// Toggle switch "Tạo tài khoản Admin" trong form
```

**Cập nhật User:**

```tsx
<UserNewEditForm isEdit={true} currentUser={userdata} />
```

## 🎯 API Endpoints được sử dụng

### Admin Only:

- `GET /user` - Danh sách users
- `POST /user` - Tạo user với roleId
- `POST /user/admin` - Tạo admin (auto role)
- `PUT /user/:id` - Cập nhật user
- `PATCH /user/:id/block` - Block/unblock
- `PATCH /user/:id/delete` - Xóa mềm

### User + Admin:

- `GET /user/profile` - Profile hiện tại
- `PUT /user/profile` - Cập nhật profile hiện tại
- `GET /user/:id` - Xem user (với phân quyền)

## 🔧 Cách test

### 1. **Test tạo User:**

```typescript
const userData = {
  username: 'testuser',
  password: 'password123',
  email: 'test@example.com',
  roleId: 2, // User role ID
  firstName: 'Test',
  lastName: 'User',
};
```

### 2. **Test tạo Admin:**

```typescript
const adminData = {
  username: 'testadmin',
  password: 'admin123',
  email: 'admin@example.com',
  firstName: 'Test',
  lastName: 'Admin',
  // Không cần roleId
};
```

### 3. **Test cập nhật profile:**

```typescript
const profileData = {
  firstName: 'Updated Name',
  phoneNumber: '+84123456789',
  // Chỉ các field được phép
};
```

## 🛡️ Security Features

1. **Role-based UI**: Form tự động ẩn/hiện field theo role
2. **Data Validation**: Required fields phù hợp với backend
3. **Error Handling**: Hiển thị lỗi rõ ràng cho user
4. **Type Safety**: TypeScript interfaces đầy đủ

## 📝 Migration Notes

### Những gì cần kiểm tra:

1. **Existing User Data**: Đảm bảo data cũ tương thích
2. **Role IDs**: Kiểm tra mapping role trong database
3. **Image Upload**: Xác nhận uploadImage trả về string
4. **Authentication**: Token header đúng format

### Breaking Changes:

- `userId` từ string → number
- `isActive/isBlock` → `userStatus` enum
- Profile structure thay đổi
- API endpoints mới cần authentication

## 🚀 Next Steps

1. Test thoroughly với data thật
2. Cập nhật UserList component nếu cần
3. Cập nhật UserTableRow component
4. Test permissions với different roles
5. Kiểm tra responsive design

Frontend giờ đã hoàn toàn sync với backend role-based system! 🎉
