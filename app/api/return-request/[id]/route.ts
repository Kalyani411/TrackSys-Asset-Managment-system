import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;           // ✅ MUST await
    const requestId = Number(id);

    const { action } = await req.json();

    if (!requestId || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const request = await prisma.assetRequest.findUnique({
      where: { id: requestId },
      include: { asset: true },
    });

    if (!request || request.requestType !== "RETURN") {
      return NextResponse.json(
        { error: "Return request not found" },
        { status: 404 }
      );
    }

    // ✅ APPROVE RETURN
    if (action === "APPROVE") {
      await prisma.$transaction([
        prisma.assetRequest.update({
          where: { id: requestId },
          data: { status: "APPROVED" },
        }),
        prisma.asset.update({
          where: { id: request.assetId! },
          data: { status: "ACTIVE" },
        }),
      ]);
    }

    // ❌ REJECT RETURN
    if (action === "REJECT") {
      await prisma.assetRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Return request error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
