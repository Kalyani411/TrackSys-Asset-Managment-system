import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, message, assetId, name, location, type } = body;

  try {
    let asset;
  if (typeof assetId === "number") {
      asset = await prisma.asset.findUnique({
        where: { id: assetId },
      });
    }
if (!asset && name && location && type) {
      asset = await prisma.asset.findFirst({
        where: {
          name,
          location,
          type,
          status: "ACTIVE",
        },
        orderBy: { id: "asc" },
      });
    }

     if (!asset || asset.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "No asset available" },
        { status: 400 }
      );
    }
       // 📝 create request
    const request = await prisma.assetRequest.create({
      data: {
        title: title || `Checkout ${asset.name}`,
        message: message || null,
        userId: Number(session.user.id),
        assetId: asset.id,
        status: "PENDING",
        requestType:"CHECKOUT"
      },
    })

    return NextResponse.json(request);
  } catch (error) {
    console.error("Error creating asset request:", error);
    return NextResponse.json(
      { error: "Failed to create asset request" },
      { status: 500 }
    );
  }
}

// ---------------- ADMIN ----------------
export async function GET() {
  try {
    const requests = await prisma.assetRequest.findMany({
      orderBy: { id: "desc" },
      include: {
        user: {
          select: { username: true },
        },
        asset: true, // 🔥 this makes asset details visible in admin
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("GET request error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


