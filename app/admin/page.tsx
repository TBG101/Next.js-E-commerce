import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Admin from "../components/Admin";
import { redirect, useRouter } from "next/navigation";

async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/");
    return null;
  }

  return <Admin />;
}
export default AdminPage;
