import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ChevronRight,
  Clock,
  ClockFading,
  Settings,
} from "lucide-react";
import Link from "next/link";

import SidebarFooterContent from "./sidebar-footer-content";
const adminNavItems = [
  {
    title: "Countdowns",
    icon: ClockFading,
    href: "/admin",
    count: 24,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2 px-2 py-1.5">
          <Clock className="h-6 w-6" />
          <span className="text-lg font-semibold">Countdownly Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {adminNavItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={group.href || "#"}
                    className="flex items-center gap-2"
                  >
                    <group.icon className="h-4 w-4" />
                    <span>{group.title}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>{group.count}</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  );
}
