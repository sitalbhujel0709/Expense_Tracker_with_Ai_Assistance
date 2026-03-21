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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "./user-provider";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Transactions", icon: CreditCard, url: "/transactions" },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const { user } = useUser();
  const redirect = useRouter();
  const isCollapsed = state === "collapsed";
  const logout = async (): Promise<void> => {
    const response = await axiosInstance.post("/users/logout");
    console.log(response.data);
    redirect.push("/login");
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4 relative">
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
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          onClick={toggleSidebar}
          className="absolute top-4 -right-7 shadow-md rounded-full hover:bg-emerald-100"
        >
          {isCollapsed ? (
            <ChevronRight className="size-4 text-emerald-700" />
          ) : (
            <ChevronRight className="size-4 text-emerald-700 rotate-180" />
          )}
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 text-emerald-700"
                  >
                    <item.icon className="shrink-0 size-5" />
                    {/* Only hide the text, keep the button/icon visible */}
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:text-center">
        <div className="flex gap-3 border items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-emerald-700">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button
            onClick={logout}
            variant={"ghost"}
            size={"icon"}
            className="ml-2 cursor-pointer group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="size-4 text-emerald-700" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
