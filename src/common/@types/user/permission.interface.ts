import { PaginationMeta } from '../common.interface';

export interface IPermission {
  id: string; // Unique identifier for the permission
  name: string; // Name of the permission, e.g., 'view_users', 'edit_roles'
  description?: string; // Optional description of the permission
  slug: string; // URL-friendly version of the permission name
  createdAt: Date; // Timestamp when the permission was created
  updatedAt: Date; // Timestamp when the permission was last updated
  isActive: boolean; // Indicates if the permission is currently active
}

export interface IPermissionListResponse {
  message: string; // Response message
  status: number; // HTTP status code
  metadata: {
    metadata: IPermission[]; // List of permissions
    meta: PaginationMeta; // Pagination metadata
  };
}
