import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products - Women",
    description: "Women's products",
    keywords: ["women", "products", "fashion", "clothing"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
