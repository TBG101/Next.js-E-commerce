import React from 'react';
import { Metadata } from "next";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params;

  const metadata = {
    title: `Product: ${slug}`,
    description: "Product details",
    keywords: ["product", "details"],
  };

  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
      </head>
      {children}
    </>
  );
}
