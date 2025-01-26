import type { Metadata } from "next";
import data from "@/data.json";
import { Providers } from "../providers";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Product description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
