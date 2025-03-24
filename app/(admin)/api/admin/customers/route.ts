import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/authUtils";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  await dbConnect();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ message: "Hello" });
}
