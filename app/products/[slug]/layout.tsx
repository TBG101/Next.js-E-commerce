import type { Metadata } from "next";
import data from "@/data.json";

export const metadata: Metadata = {
  title: "Product",
  description: "Product description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
