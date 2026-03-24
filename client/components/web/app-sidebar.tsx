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
import { usePathname, useRouter } from "next/navigation";
import { BudgetModal } from "./budget-modal";
import { SpinnerCustom } from "./custom-spinner";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Transactions", icon: CreditCard, url: "/transactions" },
];
 
export const routePaths:Record<string,string> = {
  "/": "Dashboard",
  "/transactions": "Transactions",
}

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const { user,loading } = useUser();
  const redirect = useRouter();
  const pathname = usePathname();
  const isCollapsed = state === "collapsed";
  const logout = async (): Promise<void> => {
    const response = await axiosInstance.post("/users/logout");
    console.log(response.data);
    redirect.push("/login");
  };

  if(loading){

    return <SpinnerCustom/>
  }
  if (!user?.budget) {
    return <BudgetModal />;
  }
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
          className="absolute top-4 -right-8 shadow-sm rounded-full hover:bg-emerald-100"
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
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    data-active={isActive ? "true" : undefined}
                    className="hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100
                     data-[active=true]:bg-emerald-100 data-[active=true]:text-emerald-700"
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
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:text-center border-t">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="group-data-[collapsible=icon]:hidden flex-1 flex justify-between">
            <div className="flex flex-col ">
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
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
