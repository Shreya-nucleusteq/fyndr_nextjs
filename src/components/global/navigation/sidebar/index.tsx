import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SubMenuProps } from "@/constants/menu";
import { GetAccountResponse } from "@/types/auth/auth.response";

import InfoTooltip from "../../tooltip/info-tooltip";

interface Props {
  sidebarLinks: SubMenuProps[];
  header: React.ReactElement | undefined;
  accountStatus: GetAccountResponse["accountStatus"];
}

const DashboardSidebar = ({ sidebarLinks, header, accountStatus }: Props) => {
  return (
    <Sidebar
      collapsible="icon"
      side="left"
      className="sidebar-wide-collapsed no-scrollbar   group sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-none bg-white shadow-none"
    >
      <SidebarHeader className="border-b border-secondary-20">
        <SidebarMenu>
          <div className="flex flex-col gap-2 pl-6 group-data-[collapsible=icon]:pl-3 ">
            <div className="flex justify-between group-data-[collapsible=icon]:flex-col  group-data-[collapsible=icon]:pl-1.5">
              <SidebarMenuItem className="text-[18px] font-medium leading-[27px] tracking-normal group-data-[collapsible=icon]:text-[16px] group-data-[collapsible=icon]:font-medium ">
               {header}
              </SidebarMenuItem>
              <SidebarTrigger />
            </div>
            <div className="flex gap-2 group-data-[collapsible=icon]:pl-2.5 ">
              <div
                className={`mt-1 size-4 cursor-pointer rounded-full ${accountStatus === "ACTIVE" ? "bg-status-green" : "bg-status-red"}`}
              ></div>
              <div className="group-data-[collapsible=icon]:hidden">
                <span
                  className={`heading-7-medium ${accountStatus === "ACTIVE" ? "text-[#0bac18]" : "text-[#ff2b27]"}`}
                >
                  {accountStatus === "ACTIVE" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-1 group-data-[collapsible=icon]:hidden">
                <InfoTooltip>Toggle between the status</InfoTooltip>
              </div>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <SidebarMenu>
          {sidebarLinks.map(
            ({ hasSubMenu, label, route, icon: MenuIcon, subMenu }) =>
              hasSubMenu ? (
                <Collapsible key={label} className="group/collapsible">
                  <SidebarMenuItem className={`pl-6`}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="min-h-[54px] py-3.5 pl-5">
                        {MenuIcon && typeof MenuIcon !== "string" && (
                          <MenuIcon />
                        )}
                        <span className="heading-7">{label}</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {subMenu?.map(
                        ({
                          label: subLabel,
                          route: subRoute,
                          icon: SubIcon,
                        }) => (
                          <SidebarMenuSub className="pl-4" key={subLabel}>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton
                                className="min-h-[54px] py-[14px] pl-[20px]"
                                asChild
                              >
                                <Link href={subRoute}>
                                  {SubIcon && typeof SubIcon !== "string" && (
                                    <SubIcon />
                                  )}
                                  <span className="heading-7">{subLabel}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        )
                      )}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem className="pl-6" key={label}>
                  <SidebarMenuButton
                    className="min-h-[54px] py-[14px] pl-[20px]"
                    asChild
                  >
                    <Link href={route}>
                      {MenuIcon && typeof MenuIcon !== "string" && (
                        <MenuIcon size={24} />
                      )}
                      <span className="heading-7">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
