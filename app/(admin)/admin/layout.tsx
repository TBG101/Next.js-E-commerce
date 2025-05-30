import type { Metadata } from "next";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authUtils";
import { AppSidebar } from "@/app/(admin)/admin/components/navigation/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Admin Dashboard Page - Glitz Gear",
  description:
    "Manage and oversee all operations with the Glitz Gear admin dashboard page.",
  keywords: ["admin dashboard page", "admin", "management", "Glitz Gear"],
  icons: {
    icon: [{ url: "icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "https://glitzgear.com/admin-dashboard-page",
    title: "Admin Dashboard Page - Glitz Gear",
    description:
      "Access the Glitz Gear admin dashboard page for administrative tasks and insights.",
    images: [
      {
        url: "https://glitzgear.com/assets/admin-dashboard-page-icon.png",
        width: 1200,
        height: 630,
        alt: "Glitz Gear Admin Dashboard Page",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
