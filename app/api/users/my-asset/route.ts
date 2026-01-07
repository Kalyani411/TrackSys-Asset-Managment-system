import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AssetStatus, RequestStatus } from "@prisma/client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);

    const requests = await prisma.assetRequest.findMany({
      where: {
        userId,
        status: RequestStatus.APPROVED,
        assetId: { not: null },
      },
      distinct: ["assetId"],        // 🔥 KEY LINE (NO DUPLICATES)
      include: {
        asset: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Directly return assets
    const assets = requests
      .map((r) => r.asset)
      .filter(
        (a): a is NonNullable<typeof a> =>
          a !== null && a.status === AssetStatus.ASSIGNED
      );

    return NextResponse.json(assets);
  } catch (error) {
    console.error("MY-ASSET API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
