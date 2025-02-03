import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product - Men",
    description: "Discover our exclusive collection of men's products, featuring the latest trends and timeless classics to elevate your style.",
    keywords: ["women", "products", "fashion", "clothing"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
