import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = Number(session.user.id);

  const pending = await prisma.assetRequest.findMany({
    where: {
      userId,
      status: "PENDING",
    },
    include: {
      asset: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(pending);
}
