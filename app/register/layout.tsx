import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Register for a new account",
    keywords: ["register", "signup", "account"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
