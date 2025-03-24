"use client";
import { cn, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import {
  RiDashboardHorizontalLine,
  RiDashboardHorizontalFill,
} from "react-icons/ri";
import { RiShoppingBagLine, RiShoppingBagFill } from "react-icons/ri";
import { RiFileListLine, RiFileListFill } from "react-icons/ri";
import { RiUserLine, RiUserFill } from "react-icons/ri";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <nav className="flex w-64 flex-col bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-center text-2xl font-bold">GLITZ GEAR</h1>
        </div>
        <hr className="border-gray-700" />
        <ul className="flex-1 space-y-2 p-4">
          {[
            {
              name: "Dashboard",
              href: "/admin",
              icon: <RiDashboardHorizontalLine />,
              activeIcon: <RiDashboardHorizontalFill />,
            },
            {
              name: "Products",
              href: "/admin/products",
              icon: <RiShoppingBagLine />,
              activeIcon: <RiShoppingBagFill />,
            },
            {
              name: "Orders",
              href: "/admin/orders",
              icon: <RiFileListLine />,
              activeIcon: <RiFileListFill />,
            },
            {
              name: "Customers",
              href: "/admin/customers",
              icon: <RiUserLine />,
              activeIcon: <RiUserFill />,
            },
          ].map(({ name, icon, activeIcon, href }) => {
            const isActive = pathname === href;
            return (
              <li
                key={name}
                className={cn(
                  "cursor-pointer rounded hover:bg-gray-700",
                  isActive && "bg-gray-700",
                )}
              >
                <Link
                  className="block h-full w-full p-2 pl-3 text-neutral-200"
                  href={href}
                >
                  <div className="flex items-center">
                    <span className="pr-2">
                      {isActive ? activeIcon : icon}
                    </span>
                    {name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="flex-1 bg-neutral-100 p-6">{children}</main>
    </div>
  );
}

export default AdminLayout;
