# Skeleton Loading Implementation Summary

## 📋 Overview

Đã thêm skeleton loading cho UserList component để cải thiện UX khi tìm kiếm theo tên và filter theo role.

## 🔧 Files Created/Modified

### 1. UserTableSkeleton.tsx (NEW)

- **Path**: `src/management-user/list/components/UserTableSkeleton.tsx`
- **Purpose**: Component hiển thị skeleton loading cho table rows
- **Features**:
  - Configurable số lượng rows (default: 5)
  - Skeleton cho từng column: avatar, username, fullname, email, phone, role, status, actions
  - Responsive design với Material-UI Skeleton components

### 2. UserList.tsx (MODIFIED)

- **Added Features**:
  - **Debounced Search**: Tìm kiếm theo tên với 500ms delay để tránh gọi API quá nhiều
  - **Loading States**: Multiple loading states cho các trường hợp khác nhau:
    - `isLoading`: Initial loading
    - `isFetching`: Fetching data
    - `isTyping`: Khi user đang nhập tên
    - `isRoleChanging`: Khi user đổi role filter
  - **Skeleton Integration**: Hiển thị skeleton khi bất kỳ loading state nào active

### 3. Hook Dependencies

- **useDebounce**: Import từ `src/common/hooks/useDebounce`
- **useGetListUser**: Enhanced để return `isLoading` và `isFetching` states

## 🎯 User Experience Improvements

### Search Functionality

- **Instant Feedback**: Skeleton hiển thị ngay khi user bắt đầu gõ
- **Debounced API Calls**: Giảm số lượng API calls, chỉ gọi sau 500ms user ngừng gõ
- **Smooth Transition**: Skeleton → Loading → Data seamlessly

### Filter Functionality

- **Role Filter Loading**: Skeleton hiển thị khi user thay đổi role filter
- **Reset Page**: Tự động reset về page 1 khi filter thay đổi

### Visual Design

- **Realistic Skeleton**: Skeleton layout match chính xác với real data
- **Consistent Height**: Table height không thay đổi khi switch giữa loading và data
- **Responsive**: Skeleton responsive trên tất cả devices

## 🔄 Loading State Flow

```
User Input → Set Loading State → Show Skeleton → API Call → Hide Skeleton → Show Data
```

### Search Flow:

1. User types → `setIsTyping(true)` → Skeleton shows
2. After 500ms → API called with debounced value
3. API returns → `setIsTyping(false)` → Data shows

### Role Filter Flow:

1. User selects role → `setIsRoleChanging(true)` → Skeleton shows
2. API called immediately
3. API returns → `setIsRoleChanging(false)` → Data shows

## 🚀 Technical Implementation

### State Management

```tsx
const [isTyping, setIsTyping] = useState(false);
const [isRoleChanging, setIsRoleChanging] = useState(false);
const debouncedFilterName = useDebounce(filterName, 500);
```

### Loading Condition

```tsx
{(isLoading || isFetching || isTyping || isRoleChanging) ? (
  <UserTableSkeleton rowsNum={rowsPerPage} />
) : (
  // Real data rendering
)}
```

## ✅ Benefits

- **Better UX**: Users see immediate feedback when searching/filtering
- **Performance**: Debounced search reduces API calls
- **Consistency**: Skeleton matches exact table layout
- **Accessibility**: Clear loading states for screen readers
- **Professional Feel**: Smooth loading transitions like modern apps

## 🎉 Result

Bây giờ UserList có skeleton loading hoàn chỉnh cho:

- ✅ Tìm kiếm theo tên (debounced)
- ✅ Filter theo role
- ✅ Pagination loading
- ✅ Initial page load
- ✅ Responsive design
