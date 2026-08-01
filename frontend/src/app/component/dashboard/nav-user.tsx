"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { api } from "@/lib/axios";
import { clearUser } from "@/store/authSlice";

export function NavUser({
  user,
}: {
  user: {
    email: string;
    role: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      dispatch(clearUser());

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent cursor-pointer">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.role} />
              <AvatarFallback>{user.role.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm">
              <span>{user.role}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>

            <ChevronsUpDown className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
