"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { CircleDollarSign, CreditCard, LayoutDashboard } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "#" },
  { title: "Transactions", icon: CreditCard, url: "#" },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
       <div className="flex w-full items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
          {/* Icon stays visible, rounded container added */}
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-700 text-white shrink-0">
            <CircleDollarSign className="size-5 " />
          </div>
          
          {/* Label hides when collapsed */}
          <span className="truncate font-semibold text-emerald-700 text-xl group-data-[collapsible=icon]:hidden">
            Expense Tracker
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="flex items-center gap-3 text-emerald-700">
                    <item.icon className="shrink-0 size-5" />
                    {/* Only hide the text, keep the button/icon visible */}
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:text-center">
        
      </SidebarFooter>
    </Sidebar>
  );
}