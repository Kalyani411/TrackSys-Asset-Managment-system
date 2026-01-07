import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
     
    if (id) {
      const asset = await prisma.asset.findUnique({
        where: { id: Number(id) }
      });
      return NextResponse.json(asset);
    }

    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(assets);
  } catch (error) {
    return NextResponse.json({ error: `Error fetching assets (${error})` }, { status: 500 });
  }
}
