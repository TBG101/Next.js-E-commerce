import type { Metadata } from "next";

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
