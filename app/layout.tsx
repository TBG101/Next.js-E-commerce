import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import AppLayout from "./components/AppLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

const kumbh = Kumbh_Sans({ subsets: ["latin"], variable: "--kumbh_sans" });

export const metadata: Metadata = {
  title: "Glitz Gear - Elevate Your Style",
  description:
    "Discover the ultimate in fashion with Glitz Gear, your go-to brand for premium clothing, watches, and apparel.",
  keywords: ["watches", "fashion", "premium clothing", "style", "accessories"],
  icons: {
    icon: [{ url: "icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "https://glitzgear.com",
    title: "Glitz Gear - Elevate Your Style",
    description:
      "Explore Glitz Gear for the finest selection of fashion-forward clothing and accessories.",
    images: [
      {
        url: "https://glitzgear.com/assets/brand-icon.png",
        width: 1200,
        height: 630,
        alt: "Glitz Gear Logo",
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
    <html lang="en">
      <body className={kumbh.variable}>
        <AppLayout session={session}>{children}</AppLayout>
      </body>
    </html>
  );
}
