"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Permission = {
  id: string;
  name: string;
  module: string;
  description: string;
};

type PermissionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    description: string;
    module: string;
  }) => void;
  permission?: Permission | null;
};

export default function PermissionDialog({
  open,
  onOpenChange,
  onSubmit,
  permission,
}: PermissionDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState("");

  useEffect(() => {
    if (permission) {
      setName(permission.name);
      setModule(permission.module);
      setDescription(permission.description);
    } else {
      setName("");
      setModule("");
      setDescription("");
    }
  }, [permission, open]);

  const handleSubmit = () => {
    onSubmit({
      name,
      module,
      description,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {permission ? "Edit Permission" : "Add Permission"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Permission Name
            </label>

            <Input
              placeholder="user.create"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <Input
              placeholder="Create User"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Module</label>

            <Input
              placeholder="User"
              value={module}
              onChange={(e) => setModule(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            {permission ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
