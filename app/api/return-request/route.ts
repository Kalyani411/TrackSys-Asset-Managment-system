import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assetId } = await req.json();
    if (!assetId) {
      return NextResponse.json({ error: "Asset ID missing" }, { status: 400 });
    }

    const asset = await prisma.asset.findFirst({
      where: { id: assetId, status: "ASSIGNED" },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not assigned" }, { status: 400 });
    }

    const existing = await prisma.assetRequest.findFirst({
      where: {
        assetId,
        userId: Number(session.user.id),
        requestType: "RETURN",
        status: "PENDING",
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Return request already sent" },
        { status: 409 }
      );
    }

    const request = await prisma.assetRequest.create({
      data: {
        title: `Return ${asset.name}`,
        assetId,
        userId: Number(session.user.id),
        requestType: "RETURN",
        status: "PENDING",
      },
    });

    return NextResponse.json(request);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to send return request" },
      { status: 500 }
    );
  }
}
