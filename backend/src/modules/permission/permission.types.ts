export interface CreatePermissionInput {
  name: string;
  module: string;
  description?: string;
}

export interface UpdatePermissionInput {
  name?: string;
  module?: string;
  description?: string;
}
