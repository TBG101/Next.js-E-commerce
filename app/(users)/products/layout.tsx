import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "products",
  keywords: ["products", "fashion", "clothing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
