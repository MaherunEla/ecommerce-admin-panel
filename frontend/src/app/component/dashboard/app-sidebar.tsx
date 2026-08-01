"use client";
import {
  LayoutDashboardIcon,
  House,
  ShieldCheck,
  KeyRound,
  Users,
  ImageIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav.main";
import { useAppSelector } from "@/store/hooks";

export function AppSidebar() {
  const user = useAppSelector((state) => state.auth.user);
  console.log({ user });
  const data = {
    user: {
      email: user?.email ?? "",
      role: user?.role?.name ?? "",
      avatar: "https://github.com/shadcn.png",
    },
    navMain: [
      {
        title: "Permission",
        url: "/dashboard",
        icon: KeyRound,
      },
      {
        title: "Role",
        url: "/securityandlogs",
        icon: ShieldCheck,
      },
      {
        title: "User",
        url: "/authentication",
        icon: Users,
      },
      {
        title: "Media library",
        url: "/analytics",
        icon: ImageIcon,
      },
      {
        title: "Home",
        url: "/",
        icon: House,
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard">
              <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
                <LayoutDashboardIcon className="h-6 w-6" />
                <span className="text-base font-semibold">Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <NavUser user={data.user} />
            <NavMain items={data.navMain} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
