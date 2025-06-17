export enum PermissionEnum {
  // Danh mục chung
  VIEW_DEPARTMENTS = 'view_departments',
  MANAGE_DEPARTMENTS = 'manage_departments',
  VIEW_ROOMS = 'view_rooms',
  MANAGE_ROOMS = 'manage_rooms',
  VIEW_EMPLOYEES = 'view_employees',
  MANAGE_EMPLOYEES = 'manage_employees',

  // Thiết bị - Tài sản
  VIEW_EQUIPMENT = 'view_equipment',
  MANAGE_EQUIPMENT = 'manage_equipment',
  VIEW_EQUIPMENT_GROUP = 'view_equipment_group',
  MANAGE_EQUIPMENT_GROUP = 'manage_equipment_group',
  VIEW_SUPPLIERS = 'view_suppliers',
  MANAGE_SUPPLIERS = 'manage_suppliers',
  VIEW_MANUFACTURERS = 'view_manufacturers',
  MANAGE_MANUFACTURERS = 'manage_manufacturers',
  VIEW_UNITS = 'view_units',
  MANAGE_UNITS = 'manage_units',

  // Phiếu nhập
  VIEW_IMPORT_RECEIPTS_ALL = 'view_import_receipts_all',
  VIEW_IMPORT_RECEIPTS_OWN = 'view_import_receipts_own',
  CREATE_IMPORT_RECEIPTS = 'create_import_receipts',
  APPROVE_IMPORT_RECEIPTS = 'approve_import_receipts',
  REJECT_IMPORT_RECEIPTS = 'reject_import_receipts',

  // Phiếu xuất
  VIEW_EXPORT_RECEIPTS_ALL = 'view_export_receipts_all',
  VIEW_EXPORT_RECEIPTS_OWN = 'view_export_receipts_own',
  CREATE_EXPORT_RECEIPTS = 'create_export_receipts',
  APPROVE_EXPORT_RECEIPTS = 'approve_export_receipts',

  // Phiếu điều chuyển
  VIEW_TRANSFER_RECEIPTS_ALL = 'view_transfer_receipts_all',
  VIEW_TRANSFER_RECEIPTS_OWN = 'view_transfer_receipts_own',
  CREATE_TRANSFER_RECEIPTS = 'create_transfer_receipts',
  APPROVE_TRANSFER_RECEIPTS = 'approve_transfer_receipts',

  // Phiếu mượn
  VIEW_BORROW_RECEIPTS_ALL = 'view_borrow_receipts_all',
  VIEW_BORROW_RECEIPTS_OWN = 'view_borrow_receipts_own',
  CREATE_BORROW_RECEIPTS = 'create_borrow_receipts',
  APPROVE_BORROW_RECEIPTS = 'approve_borrow_receipts',
  RETURN_BORROWED_EQUIPMENT = 'return_borrowed_equipment',

  // Phiếu thanh lý
  VIEW_LIQUIDATION_RECEIPTS_ALL = 'view_liquidation_receipts_all',
  VIEW_LIQUIDATION_RECEIPTS_OWN = 'view_liquidation_receipts_own',
  CREATE_LIQUIDATION_RECEIPTS = 'create_liquidation_receipts',
  APPROVE_LIQUIDATION_RECEIPTS = 'approve_liquidation_receipts',

  // Người dùng & phân quyền
  VIEW_ACCOUNTS = 'view_accounts',
  MANAGE_ACCOUNTS = 'manage_accounts',
  VIEW_ROLES = 'view_roles',
  MANAGE_ROLES = 'manage_roles',
  ASSIGN_ROLES = 'assign_roles',

  // Thống kê - Báo cáo
  VIEW_EQUIPMENT_STATISTICS = 'view_equipment_statistics',
  VIEW_ROOM_USAGE_STATISTICS = 'view_room_usage_statistics',
  VIEW_COST_STATISTICS = 'view_cost_statistics',
  EXPORT_REPORTS = 'export_reports',

  // Thông báo - Nhật ký
  VIEW_NOTIFICATIONS = 'view_notifications',
  MANAGE_NOTIFICATIONS = 'manage_notifications',
  VIEW_LOGS = 'view_logs',
}
