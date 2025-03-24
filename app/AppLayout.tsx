"use client";

import { Providers } from "./providers";

import { SessionProvider } from "next-auth/react";

export default function AppLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <Providers>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Providers>
  );
}
