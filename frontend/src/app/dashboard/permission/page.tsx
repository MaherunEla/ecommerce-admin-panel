"use client";

import { useEffect, useState } from "react";
import PermissionTable from "@/app/component/permission/PermissionTable";
import PermissionDialog from "@/app/component/permission/PermissionDialog";
import DeletePermissionDialog from "@/app/component/permission/DeletePermissionDialog";
import { api } from "@/lib/axios";

type Permission = {
  id: string;
  name: string;
  description: string;
  module: string;
  createdAt: string;
};

export default function PermissionPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const fetchPermissions = async () => {
    try {
      const res = await api.get("/permissions");
      setPermissions(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPermissions();
  }, []);
  const handleAdd = () => {
    setSelectedPermission(null);
    setDialogOpen(true);
    setSelectedPermission(null);
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const permission = permissions.find((item) => item.id === id) ?? null;

    setSelectedPermission(permission);
    setDeleteOpen(true);
  };

  const handleSubmit = async (data: {
    name: string;
    description: string;
    module: string;
  }) => {
    try {
      if (selectedPermission) {
        await api.patch(`/permissions/${selectedPermission.id}`, data);
      } else {
        await api.post("/permissions", data);
      }

      await fetchPermissions();
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedPermission) return;

    try {
      await api.delete(`/permissions/${selectedPermission.id}`);

      await fetchPermissions();
      setDeleteOpen(false);
      setSelectedPermission(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Permission Management</h1>
        <p className="text-muted-foreground">Manage application permissions.</p>
      </div>

      <PermissionTable
        permissions={permissions}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onAdd={handleAdd}
      />

      <PermissionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        permission={selectedPermission}
        onSubmit={handleSubmit}
      />

      <DeletePermissionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
