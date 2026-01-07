import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  typeName: string;
}

export async function GET(
  req: Request,
  context: { params: Promise<RouteParams> }
) {
  try {
    // ✅ FIX 1: params ko await karo
    const { typeName } = await context.params;

    // ✅ FIX 2: type filter properly lagao
    const assets = await prisma.asset.groupBy({
      by: ["name", "location", "type"],
      where: {
        type: typeName,        // 🔥 NOW FILTER APPLIED
        status: "ACTIVE",
      },
      _count: {
        id: true,
      },
    });

    console.log("GROUPED ASSETS >>>", assets);

    return NextResponse.json(assets);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json([], { status: 200 });
  }
}
