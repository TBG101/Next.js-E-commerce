import { AppSidebar } from "@/app/(admin)/admin/components/navigation/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { data } from "framer-motion/client";
import React from "react";
import { TransactionTable } from "./transactionTable";

function DashboardPage() {
  return (
    <section>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
