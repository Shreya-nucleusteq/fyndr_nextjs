import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

import { auth } from "@/auth";
import Footer from "@/components/global/navigation/footer";
import Navbar from "@/components/global/navigation/navbar";
import DashboardSidebar from "@/components/global/navigation/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BUSINESS_MENU } from "@/constants/menu";
import ROUTES from "@/constants/routes";
import { AccountStatus } from "@/types/auth/auth.types";

const BusinessLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session || !session.user) redirect(ROUTES.CALLBACK_SIGN_IN);

  const businessName = session.user.name;
  const accountStatus = session.user.accountStatus as AccountStatus;
  const firstName = businessName.split(" ")[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col bg-secondary-10 pt-16">
        <div className="">
          <div className="flex min-h-0 flex-col">
            <SidebarProvider>
              <DashboardSidebar
                header={<div className="w-full">Welcome {firstName}</div>}
                sidebarLinks={BUSINESS_MENU}
                accountStatus={accountStatus!}
              />
              {children}
            </SidebarProvider>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BusinessLayout;
