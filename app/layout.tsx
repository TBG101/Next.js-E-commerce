import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import AppLayout from "./components/AppLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const kumbh = Kumbh_Sans({ subsets: ["latin"], variable: "--kumbh_sans" });

export const metadata: Metadata = {
  title: "Sneakers",
  description: "The best sneakers in the world",
  keywords: "sneakers, shoes, fashion",
  openGraph: {
    type: "website",
    url: "http://localhost:3000",
    title: "Sneakers",
    description: "The best sneakers in the world",

    // This image will be used as the default social share image
    images: [
      {
        url: "http://localhost:3000/brand.svg",
        width: 800,
        height: 600,
        alt: "brand",
      },
    ],

  },
};

export default async function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <meta name="keywords" content="sneakers, shoes, fashion" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000" />
        <meta property="og:title" content="Sneakers" />
        <meta property="og:description" content="The best sneakers in the world" />
        <meta property="og:image" content="http://localhost:3000/brand.svg" />
      </head>
      <body className={`${kumbh.className}`}>
        <AppLayout session={session}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}