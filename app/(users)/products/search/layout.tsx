import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search",
    description: "Search for products",
    keywords: ["search", "products", "find"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
