import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const requests = await prisma.assetRequest.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(requests);
}
