# API Specification: Workflow Dashboard Statistics

## Tổng quan

API này cung cấp thống kê cho dashboard workflow của hệ thống quản lý đơn hàng. Hỗ trợ lọc theo thời gian với các tùy chọn: ngày, 7 ngày, tháng, hoặc khoảng thời gian tùy chọn.

## Base URL

```
/api/v1/dashboard/workflow
```

## Authentication

- Yêu cầu: Bearer Token
- Vai trò: Admin only

---

## 1. API Workflow Statistics

### Endpoint

```
GET /api/v1/dashboard/workflow/statistics
```

### Query Parameters

| Parameter   | Type   | Required | Description                                               | Example            |
| ----------- | ------ | -------- | --------------------------------------------------------- | ------------------ |
| `period`    | string | No       | Khoảng thời gian: 'today', '7days', 'month', 'custom'     | `7days`            |
| `startDate` | string | No       | Ngày bắt đầu (YYYY-MM-DD) - bắt buộc khi period='custom'  | `2025-07-01`       |
| `endDate`   | string | No       | Ngày kết thúc (YYYY-MM-DD) - bắt buộc khi period='custom' | `2025-07-14`       |
| `timezone`  | string | No       | Múi giờ                                                   | `Asia/Ho_Chi_Minh` |

### Response

```typescript
{
  "message": "Lấy thống kê workflow thành công",
  "status": 200,
  "metadata": {
    "period": {
      "type": "7days",
      "startDate": "2025-07-08",
      "endDate": "2025-07-14",
      "timezone": "Asia/Ho_Chi_Minh"
    },
    "ordersByStatus": [
      {
        "status": "pending_confirmation",
        "displayName": "Chờ xác nhận",
        "count": 25,
        "percentage": 35.2,
        "color": "#ff9800"
      },
      {
        "status": "pending_pickup",
        "displayName": "Chờ lấy hàng",
        "count": 18,
        "percentage": 25.4,
        "color": "#2196f3"
      },
      {
        "status": "shipping",
        "displayName": "Đang giao hàng",
        "count": 15,
        "percentage": 21.1,
        "color": "#ff5722"
      },
      {
        "status": "delivered",
        "displayName": "Đã giao hàng",
        "count": 12,
        "percentage": 16.9,
        "color": "#4caf50"
      },
      {
        "status": "cancelled",
        "displayName": "Đã hủy",
        "count": 1,
        "percentage": 1.4,
        "color": "#f44336"
      }
    ],
    "paymentsByStatusAndMethod": [
      {
        "method": "momo",
        "displayName": "MoMo",
        "status": "completed",
        "count": 45,
        "totalAmount": 15000000,
        "percentage": 65.2
      },
      {
        "method": "vnpay",
        "displayName": "VNPay",
        "status": "completed",
        "count": 30,
        "totalAmount": 8500000,
        "percentage": 23.4
      },
      {
        "method": "cod",
        "displayName": "Thanh toán khi nhận hàng",
        "status": "pending",
        "count": 20,
        "totalAmount": 4200000,
        "percentage": 8.1
      },
      {
        "method": "banking",
        "displayName": "Chuyển khoản",
        "status": "completed",
        "count": 10,
        "totalAmount": 2800000,
        "percentage": 3.3
      }
    ]
  }
}
```

---

## 2. API Dashboard Statistics

### Endpoint

```
GET /api/v1/dashboard/workflow/overview
```

### Query Parameters

Tương tự như API Workflow Statistics

### Response

```typescript
{
  "message": "Lấy thống kê dashboard thành công",
  "status": 200,
  "metadata": {
    "period": {
      "type": "7days",
      "startDate": "2025-07-08",
      "endDate": "2025-07-14",
      "timezone": "Asia/Ho_Chi_Minh"
    },
    "totalOrders": 156,
    "totalActions": 423,
    "completionRate": 87.5,
    "averageProcessingTime": 45, // phút
    "trends": {
      "ordersGrowth": 12.5, // % so với kỳ trước
      "actionsGrowth": 8.3,
      "completionRateChange": 0.0,
      "processingTimeChange": -5.2
    },
    "pendingAlerts": {
      "pendingConfirmation": 12,
      "pendingPickup": 8,
      "overdueOrders": 3,
      "paymentIssues": 2
    },
    "actionStats": [
      {
        "action": "payment_completed",
        "displayName": "Thanh toán hoàn tất",
        "count": 145,
        "percentage": 34.3,
        "trend": "up",
        "trendValue": 12.5
      },
      {
        "action": "confirmed",
        "displayName": "Xác nhận đơn hàng",
        "count": 132,
        "percentage": 31.2,
        "trend": "up",
        "trendValue": 8.7
      },
      {
        "action": "picked_up",
        "displayName": "Lấy hàng",
        "count": 89,
        "percentage": 21.0,
        "trend": "stable",
        "trendValue": 0.2
      },
      {
        "action": "delivered",
        "displayName": "Giao hàng thành công",
        "count": 78,
        "percentage": 18.4,
        "trend": "up",
        "trendValue": 15.3
      },
      {
        "action": "cancelled",
        "displayName": "Hủy đơn hàng",
        "count": 15,
        "percentage": 3.5,
        "trend": "down",
        "trendValue": -23.1
      }
    ],
    "actorStats": [
      {
        "actorType": "admin",
        "displayName": "Quản trị viên",
        "count": 189,
        "percentage": 44.7,
        "averageResponseTime": 15, // phút
        "activeCount": 5
      },
      {
        "actorType": "shipper",
        "displayName": "Người giao hàng",
        "count": 156,
        "percentage": 36.9,
        "averageResponseTime": 30,
        "activeCount": 12
      },
      {
        "actorType": "payment_gateway",
        "displayName": "Cổng thanh toán",
        "count": 145,
        "percentage": 34.3,
        "averageResponseTime": 2,
        "activeCount": null
      },
      {
        "actorType": "customer",
        "displayName": "Khách hàng",
        "count": 23,
        "percentage": 5.4,
        "averageResponseTime": 120,
        "activeCount": null
      },
      {
        "actorType": "system",
        "displayName": "Hệ thống",
        "count": 12,
        "percentage": 2.8,
        "averageResponseTime": 1,
        "activeCount": null
      }
    ]
  }
}
```

---

## 3. API Time Series Data (Biểu đồ theo thời gian)

### Endpoint

```
GET /api/v1/dashboard/workflow/timeseries
```

### Query Parameters

| Parameter     | Type   | Required | Description                              | Example                  |
| ------------- | ------ | -------- | ---------------------------------------- | ------------------------ |
| `period`      | string | No       | Khoảng thời gian                         | `7days`                  |
| `startDate`   | string | No       | Ngày bắt đầu                             | `2025-07-01`             |
| `endDate`     | string | No       | Ngày kết thúc                            | `2025-07-14`             |
| `granularity` | string | No       | Độ chi tiết: 'hour', 'day', 'week'       | `day`                    |
| `metrics`     | string | No       | Chỉ số cần lấy (phân cách bằng dấu phẩy) | `orders,revenue,actions` |

### Response

```typescript
{
  "message": "Lấy dữ liệu thời gian thành công",
  "status": 200,
  "metadata": {
    "period": {
      "type": "7days",
      "startDate": "2025-07-08",
      "endDate": "2025-07-14",
      "granularity": "day"
    },
    "timeSeries": [
      {
        "date": "2025-07-08",
        "orders": 18,
        "revenue": 2450000,
        "actions": 52,
        "completionRate": 85.2
      },
      {
        "date": "2025-07-09",
        "orders": 22,
        "revenue": 3200000,
        "actions": 67,
        "completionRate": 89.1
      },
      {
        "date": "2025-07-10",
        "orders": 20,
        "revenue": 2800000,
        "actions": 58,
        "completionRate": 87.5
      },
      {
        "date": "2025-07-11",
        "orders": 25,
        "revenue": 3650000,
        "actions": 71,
        "completionRate": 88.3
      },
      {
        "date": "2025-07-12",
        "orders": 19,
        "revenue": 2900000,
        "actions": 55,
        "completionRate": 86.8
      },
      {
        "date": "2025-07-13",
        "orders": 28,
        "revenue": 4100000,
        "actions": 78,
        "completionRate": 91.2
      },
      {
        "date": "2025-07-14",
        "orders": 24,
        "revenue": 3400000,
        "actions": 62,
        "completionRate": 89.7
      }
    ]
  }
}
```

---

## 4. API Real-time Metrics (Thống kê thời gian thực)

### Endpoint

```
GET /api/v1/dashboard/workflow/realtime
```

### Response

```typescript
{
  "message": "Lấy thống kê thời gian thực thành công",
  "status": 200,
  "metadata": {
    "timestamp": "2025-07-14T10:30:00Z",
    "activeOrders": 45,
    "totalUsers": 12,
    "pendingActions": 8,
    "systemHealth": {
      "status": "healthy",
      "responseTime": 156, // ms
      "uptime": 99.98
    },
    "recentActivities": [
      {
        "id": 1,
        "orderId": 62,
        "action": "delivered",
        "actorType": "shipper",
        "actorName": "Hùng",
        "timestamp": "2025-07-14T10:25:00Z",
        "description": "Đã giao hàng thành công"
      },
      {
        "id": 2,
        "orderId": 63,
        "action": "picked_up",
        "actorType": "shipper",
        "actorName": "Minh",
        "timestamp": "2025-07-14T10:20:00Z",
        "description": "Đã lấy hàng, chuẩn bị giao"
      }
    ]
  }
}
```

---

## 5. Error Responses

### 400 Bad Request

```json
{
  "message": "Tham số không hợp lệ",
  "status": 400,
  "errors": [
    {
      "field": "period",
      "message": "Giá trị period phải là: today, 7days, month, hoặc custom"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "message": "Không có quyền truy cập",
  "status": 401
}
```

### 403 Forbidden

```json
{
  "message": "Chỉ admin mới có quyền truy cập dashboard",
  "status": 403
}
```

### 500 Internal Server Error

```json
{
  "message": "Lỗi server nội bộ",
  "status": 500,
  "error": "Database connection failed"
}
```

---

## 6. Cách sử dụng trong Frontend

### Ví dụ gọi API

```typescript
// Hook để lấy workflow statistics
const useWorkflowStatistics = (period: string, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams({
    period,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  return useQuery(
    ['workflow-statistics', period, startDate, endDate],
    () => fetch(`/api/v1/dashboard/workflow/statistics?${params}`).then((res) => res.json()),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook để lấy dashboard overview
const useDashboardOverview = (period: string, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams({
    period,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  return useQuery(
    ['dashboard-overview', period, startDate, endDate],
    () => fetch(`/api/v1/dashboard/workflow/overview?${params}`).then((res) => res.json()),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
};
```

### Sử dụng trong component

```typescript
const WorkflowDashboard = () => {
  const [period, setPeriod] = useState('7days');
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  const { data: workflowStats, isLoading: workflowLoading } = useWorkflowStatistics(
    period,
    dateRange.startDate,
    dateRange.endDate
  );

  const { data: dashboardStats, isLoading: dashboardLoading } = useDashboardOverview(
    period,
    dateRange.startDate,
    dateRange.endDate
  );

  // Render component...
};
```

---

## 7. Lưu ý Implementation

### Database Optimization

- Sử dụng index cho các trường `created_at`, `updated_at`, `status`
- Cache kết quả thống kê trong Redis với TTL 5 phút
- Sử dụng materialized views cho các truy vấn phức tạp

### Performance

- Pagination cho các API trả về nhiều dữ liệu
- Compression cho response lớn
- Rate limiting: 100 requests/minute per user

### Security

- Validate tất cả input parameters
- Sanitize dữ liệu trước khi trả về
- Log tất cả API calls cho audit

### Monitoring

- Track response time cho mỗi endpoint
- Monitor error rates
- Alert khi có anomalies trong data
