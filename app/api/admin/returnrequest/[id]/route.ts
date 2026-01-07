import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { action } = await req.json(); 
  const id = Number((await context.params).id);

  const request = await prisma.assetRequest.findUnique({ where: { id } });
  if (!request || request.status !== "PENDING") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await prisma.assetRequest.update({
    where: { id },
    data: { status: action === "APPROVE" ? "APPROVED" : "REJECTED" },
  });

  if (action === "APPROVE" && request.assetId) {
    await prisma.asset.update({
      where: { id: request.assetId },
      data: { status: "ACTIVE" },
    });
  }

  return NextResponse.json({ success: true });
}
