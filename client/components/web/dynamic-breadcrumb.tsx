"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { routePaths } from "./app-sidebar";

export const DynamicBreadcrumb = ()=>{
  const pathname = usePathname();
  const activeHeader = routePaths[pathname] || "Page Not Found";
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-emerald-700 font-semibold">{activeHeader}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}