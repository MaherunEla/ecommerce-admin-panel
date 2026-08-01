"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Permission = {
  id: string;
  name: string;
  description: string;
  module: string;
  createdAt: string;
};

type PermissionTableProps = {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};

export default function PermissionTable({
  permissions,
  onEdit,
  onDelete,
  onAdd,
}: PermissionTableProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Input placeholder="Search permission..." className="max-w-sm" />

        <Button onClick={onAdd}>Add Permission</Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Permission</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="w-[180px]">Created At</TableHead>
              <TableHead className="text-right w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">
                    {permission.name}
                  </TableCell>

                  <TableCell>{permission.description}</TableCell>
                  <TableCell>{permission.module}</TableCell>

                  <TableCell>
                    {new Date(permission.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onEdit(permission)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDelete(permission.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  No permissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-end">
        <Button variant="outline" disabled>
          Previous
        </Button>

        <Button variant="outline" className="mx-2">
          1
        </Button>

        <Button variant="outline" disabled>
          Next
        </Button>
      </div>
    </div>
  );
}
