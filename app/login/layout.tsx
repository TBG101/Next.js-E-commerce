import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
    keywords: ["login", "auth", "authentication"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
