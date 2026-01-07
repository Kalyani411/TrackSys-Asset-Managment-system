import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AssetStatus, RequestStatus } from "@prisma/client";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { status } = await req.json();

  const request = await prisma.assetRequest.update({
    where: { id },
    data: { status: status as RequestStatus },
  });

  // ✔ FIX: assetId might be null
  if (!request.assetId) {
    return NextResponse.json(
      { error: "This request is not linked to any asset" },
      { status: 400 }
    );
  }

  
  if (status === "APPROVED") {
    await prisma.asset.update({
      where: { id: request.assetId },
      data: { status: AssetStatus.ASSIGNED },
    });
  }

  if (status === "REJECTED") {
    await prisma.asset.update({
      where: { id: request.assetId },
      data: { status: AssetStatus.ACTIVE },
    });
  }
 await prisma.asset.groupBy({
  by: ["name", "value"],
  where: { status: "ACTIVE" },
  _count: { id: true },
});
  return NextResponse.json({ success: true, request });
}


